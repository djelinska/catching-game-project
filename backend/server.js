require('dotenv').config();

const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const mqtt = require('mqtt');
const cookieParser = require('cookie-parser');

const userRouter = require('./routes/userRouter');
const messageRouter = require('./routes/messageRouter');
const commentRouter = require('./routes/commentRouter');
const challengeRouter = require('./routes/challengeRouter');

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3001;

const mqttClient = mqtt.connect('mqtt://mqtt.eclipseprojects.io');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api/users', userRouter);
app.use('/api/messages', messageRouter);
app.use('/api/comments', commentRouter);
app.use('/api/challenges', challengeRouter);

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		server.listen(port, () => {
			console.log(`Connected to db and listening on port ${port}`);
		});
	})
	.catch((error) => console.log(error));

mqttClient.on('connect', () => {
	console.log('Połączono');
});
