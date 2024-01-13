require('dotenv').config();

const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(userRoutes);

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		server.listen(process.env.PORT, () => {
			console.log(`Connected to db and listening on port ${process.env.PORT}`);
		});
	})
	.catch((error) => console.log(error));
