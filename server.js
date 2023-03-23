'use strict';

//installed express
const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const verifyUser = require('./auth.js');


const getPokemon = require('./modules/pokemon.js');
const Poke = require('./models/pokemon-model.js');


app.get('/', (req, res) => {
  res.status(200).send('Hello from our server!');
});

//get Pokemon data from API
app.get('/pokemon', getPokemon);

app.use(verifyUser);
//data CRUD from MongoDB
app.get('/pokemondb', getPokemonTeam);
app.post('/pokemondb', postPokemonTeam);
app.delete('/pokemondb/:id', deletePokemonTeam);
app.put('/pokemondb/:id', putPokemonTeam);

//getting the user info
app.get('/user', handleGetUser);


//get Pokemon from Database
async function getPokemonTeam(req, res) {
  const pokeTeam = await Poke.find({ email: req.user.email });
  res.send(pokeTeam);
}

//add Pokemons to database
async function postPokemonTeam(req, res) {
  const { name, types, weaknesses } = req.body;
  console.log(req.body)
  try {
    const createdPoke = await Poke.create({ ...req.body, email: req.user.email });
    res.status(200).send(createdPoke)
  } catch (e) {
    console.log(e)
    res.status(500).send('server error');
  }
}

//delete the poke team
async function deletePokemonTeam(req, res) {
  const { id } = req.params;
  try {
    const poke = await Poke.findOne({ _id: id, email:req.user.email });
    if (!poke) res.status(400).send('unable to delete poke');
    else {
      await Poke.findByIdAndDelete(id);
      res.status(204).send('bye Poke');
    }
  } catch (e) {
    res.status(500).send('server error');
  }
  // await Poke.findByIdAndDelete(req.params.id);
  // res.status(200).send('Pokemon deleted');
}

//update Pokemon team in DB
async function putPokemonTeam(req, res){

  const { id } = req.params;
  try {
    const poke = await Poke.findOne({ _id: id, email: req.user.email });
    if (!poke) res.status(400).send('unable to update pokemon');
    else {
      const updatedPoke = await Poke.findByIdAndUpdate(id, { ...req.body, email: req.user.email }, { new: true, overwrite: true });
      res.status(200).send(updatedPoke);
    }
  } catch (e) {
    res.status(500).send('server error');
  }

  // let id = req.params.id;
  // let updatedPoke = req.body;

  // let updatedPokeFromDb = await Poke.findByIdAndUpdate(id, updatedPoke, {new: true, overwrite: true});
  // res.status(200).send(updatedPokeFromDb);
}

function handleGetUser(req, res) {
  console.log('Getting the user');
  res.send(req.user);
}

app.get('*', (req, res) => {
  res.send('The source does not exist');
} );
app.use((error, request, response) => {
  response.status(500).send(error.message);
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Server up on ${process.env.PORT}`));
