const express = require('express');
const mongoose = require('mongoose');
const sugerenciaRouter = require('./routes/sugerenciaRoutes.js');


const MONGO_USERNAME = 'user';
const MONGO_PASSWORD = 'pwd';
const MONGO_HOSTNAME = '127.0.0.1';
const MONGO_PORT = '27017';
const MONGO_DB = 'ika';

const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

const app = express();
app.use(express.json()); // Make sure it comes back as json

mongoose.connect(url, {
  useNewUrlParser: true
});

app.use(sugerenciaRouter);

app.listen(3001, () => { console.log('Server is running...') });