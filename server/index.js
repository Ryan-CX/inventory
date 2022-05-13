//setup express server on port 5000 using ECMAScript 6
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
//use dotenv
require('dotenv').config();
//import itemRoute
const itemRoute = require('./route/itemRoute');
//import warehouseRoute
const warehouseRoute = require('./route/warehouseRoute');

app.use(cors());
app.use(express.json());
app.use('/', itemRoute);
app.use('/', warehouseRoute);

mongoose
	.connect(process.env.DB_CONNECTION)
	.then(() => {
		console.log('Connected to database');
	})
	.catch(() => {
		console.log('Connection failed');
	});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
