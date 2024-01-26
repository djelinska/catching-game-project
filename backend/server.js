require('dotenv').config();

const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');

const userRouter = require('./routes/userRouter');

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', userRouter);

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		server.listen(port, () => {
			console.log(`Connected to db and listening on port ${port}`);
		});
	})
	.catch((error) => console.log(error));
