'use strict';
const express = require('express');
const cors = require('cors');

require('dotenv').config();
// const weather = require('./modules/weather');
// const getMovie = require('./modules/movie');
const app = express();
app.use(cors());
app.use(express.json());
const mongoose = require('mongoose');
const Pokemon = require('./models/books.js');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
  console.log('Mongoose is connected');
});


// app.get('/weather', weatherHandler);
// app.get('/movie', getMovie );
const PORT = process.env.PORT || 3002;


app.listen(PORT, () => console.log(`Server up on ${process.env.PORT}`));