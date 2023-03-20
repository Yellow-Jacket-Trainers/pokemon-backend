'use strict';
const express = require('express');
const cors = require('cors');

require('dotenv').config();
const weather = require('./modules/weather');
const getMovie = require('./modules/movie');
const app = express();
app.use(cors());


app.get('/weather', weatherHandler);
app.get('/movie', getMovie );
const PORT = process.env.PORT || 3002;


function weatherHandler(request, response) {
  const { lat, lon } = request.query;

  weather(lat, lon)
    .then(summaries => response.send(summaries))
    .catch((error) => {
      console.error(error);
      response.status(500).send('Sorry. Something went wrong!');
    });
}

app.listen(PORT, () => console.log(`Server up on ${process.env.PORT}`));