const express = require('express');
const mongoose = require('mongoose');
const reviewRouter = require('./routes/reviewRoutes.js');


const MONGO_USERNAME = 'user';
const MONGO_PASSWORD = 'pwd';
const MONGO_HOSTNAME = '127.0.0.1';
const MONGO_PORT = '27017';
const MONGO_DB = 'ika';

const url = `mongodb+srv://fernanda:hola1234@ika-kwkdd.azure.mongodb.net/test?retryWrites=true&w=majority`;

const app = express();
app.use(express.json()); // Make sure it comes back as json

mongoose.connect(url, {
  useNewUrlParser: true
});

app.use(reviewRouter);

app.listen(3001, () => { console.log('Server is running...') });
