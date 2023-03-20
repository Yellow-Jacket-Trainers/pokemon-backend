'use strict'

console.log('Drako')

//require
// in our server we have to use 'require' instead of import
// here we will list the requirement for our server

// to create a server we are bringing in Express
const express = require('express');

// we need to bring in our .env file, so we'll use this after we have run 'npm i dotenv' 
require('dotenv').config();

let data = require('./weather.json');

// we must include cors if we want to share resources over the web
const cors = require('cors');
const getMovies = require('./modules/movie');
const getWeather = require('./modules/weather');


// Use
// once we require something, we have to use it
// this is where we assign the required file a varaible 
// react does this in one step with import, it says we must use it and it assigns it to a variable
// express takes 2 steps: require and use

// once we have express we must use it
const app = express();
app.use(cors());

// define  a PORT & validate env is working
const PORT = process.env.PORT || 3002;
// const WEATHER_TOKEN = process.env.WEATHERBIT_API_KEY;
// const MOVIE_TOKEN = process.env.MOVIEDB_API_KEY;

// if my server is running on 3002, i know something is wrong with either my .env file or how im importing it.

// Routes
// we will use these to access our endpoints

// define our default route
// app.get() correlates to axios.get()
// the first argument is a Url in quote 
// the second is the callback that defines what should happen when as request comes into that url 
app.get('/', (req, res) => { 
  res.status(200).send('Hello from our server!');
});

// app.get('/sayHello', (request, response) => {
//   console.log(request);
//   response.send('Hello');
// });

// // must be listed last in our route state  
app.get('*', (req, res) => {
  res.send('The source does not exist');
} );

//http://localhost:3001/weather?search=Seattle
app.get('/weather', getWeather);
app.get('/movies', getMovies);


// ERRORS
// handle all the errors
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});
// LISTEN
// start the server
// listen is Express method that takes in two arguments, a port valie and a call back function
app.listen(PORT, () => console.log(`listening on ${PORT}`));