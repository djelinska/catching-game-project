require('dotenv').config();

const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const mqtt = require('mqtt');
const cookieParser = require('cookie-parser');
const User = require('./models/userModel');
const { Server } = require('socket.io');

const userRouter = require('./routes/userRouter');
const messageRouter = require('./routes/messageRouter');
const commentRouter = require('./routes/commentRouter');
const challengeRouter = require('./routes/challengeRouter');

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3001;
const io = new Server(server, {
	cors: {
		origin: 'http://localhost:3000',
		methods: ['GET', 'POST'],
	},
});

const mqttClient = mqtt.connect('mqtt://mqtt.eclipseprojects.io');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api/users', userRouter);
app.use('/api/messages', messageRouter);
app.use('/api/comments', commentRouter);
app.use('/api/challenges', challengeRouter);

app.get('/sse', (req, res) => {
	res.setHeader('Content-Type', 'text/event-stream');
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Cache-Control', 'no-cache');
	res.setHeader('Connection', 'keep-alive');

	const sendData = (data) => {
		res.write(`data: ${JSON.stringify(data)}\n\n`);
	};

	const intervalId = setInterval(() => {
		const randomNumber = Math.floor(Math.random() * 10);
		sendData({ number: randomNumber });
	}, 5000);

	req.on('close', () => {
		clearInterval(intervalId);
		res.end();
	});
});

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		server.listen(port, () => {
			console.log(`Connected to db and listening on port ${port}`);
		});
	})
	.catch((error) => console.log(error));

mqttClient.on('connect', () => {
	console.log('MQTT client connected');
	const intervalId = setInterval(() => {
		const currentTime = new Date().toLocaleTimeString();
		mqttClient.publish('time', currentTime);
	}, 1000);

	mqttClient.on('close', () => {
		clearInterval(intervalId);
		console.log('MQTT client dIsonnected');
	});
});

io.on('connection', (socket) => {
	console.log('Websocket client connected');

	socket.on('getTotalScore', async (username) => {
		const user = await User.findOne({ username });
		const totalScore = user.stats.total_score;
		socket.emit('totalScore', totalScore);
	});

	socket.on('disconnect', () => {
		console.log('Websocket client disconnected');
	});
});
