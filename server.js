'use strict';

//installed express
const express = require('express');
const cors = require('cors');

require('dotenv').config();
// const weather = require('./modules/weather');
// const getMovie = require('./modules/movie');
const app = express();
app.use(cors());
app.use(express.json());

// const verifyUser = require('./auth.js');
// app.use(verifyUser);

const getPokemon = require('./modules/pokemon.js');
const Poke = require('./models/pokemon-model.js');


app.get('/', (req, res) => {
  res.status(200).send('Hello from our server!');
});

//get Pokemon data from API
app.get('/pokemon', getPokemon);

//data CRUD from MongoDB
app.get('/pokemondb', getPokemonTeam);
app.post('/pokemondb', postPokemonTeam);
app.delete('/pokemondb/:id', deletePokemonTeam);
app.put('/pokemondb/:id', putPokemonTeam);

//getting the user info
// app.get('/user', handleGetUser);


//get Pokemon from Database
async function getPokemonTeam(req, res) {
  const pokeTeam = await Poke.find({});
  res.send(pokeTeam);
}

//add Pokemons to database
async function postPokemonTeam(req, res) {
  let createdPoke = await Poke.create(req.body);
  res.status(200).send(createdPoke);
}

//delete the poke team
async function deletePokemonTeam(req, res) {
  await Poke.findByIdAndDelete(req.params.id);
  res.status(200).send('Pokemon deleted');
}

//update Pokemon team in DB
async function putPokemonTeam(req, res){
  let id = req.params.id;
  let updatedPoke = req.body;

  let updatedPokeFromDb = await Poke.findByIdAndUpdate(id, updatedPoke, {new: true, overwrite: true});
  res.status(200).send(updatedPokeFromDb);
}

// function handleGetUser(req, res) {
//   console.log('Getting the user');
//   res.send(req.user);
// }


// app.get('/weather', weatherHandler);
// app.get('/movie', getMovie );

app.get('*', (req, res) => {
  res.send('The source does not exist');
} );
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Server up on ${process.env.PORT}`));
