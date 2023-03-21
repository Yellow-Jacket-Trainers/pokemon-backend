const axios = require('axios');
const cache = require('./cache.js');
const mongoose = require('mongoose');
// const PokemonModel = require('../models/pokemon.js');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

mongoose.connect(process.env.DB_URL);

class Pokemon {
  constructor(pokemonObject) {
    this.name = pokemonObject.name,
    this.types = pokemonObject.types,
    this.hp = pokemonObject.hp,
    this.abilities = pokemonObject.abilities,
    this.attacks = pokemonObject.attacks,
    this.weaknesses = pokemonObject.weaknesses,
    this.image = pokemonObject.images.large;
  }
}

async function getPokemon(req, res, next) {
  let pokemon = req.query.name;
  console.log(pokemon);
  // https://api.pokemontcg.io/v2/cards?q=name:gardevoir
  let config = {
    baseURL: 'https://api.pokemontcg.io/v2/cards',
    params: {
      q: `name:${pokemon}`,
    },
    method: 'get',
  };
  let key = pokemon + 'Data';
  if (cache[key]) {
    console.log('found CASH!' + cache[key]);
    res.status(200).send(cache[key].data);
  } else {
    console.log('no cash, fetching resource');

    try {
      let pokeData = await axios(config);
      console.log(pokeData.data.data);
      let pokeDataResults = pokeData.data.data.map(item => new Pokemon(item));
      res.status(200).send(pokeDataResults);
      cache[key] ={
        data:pokeDataResults,
        timeStamp: Date.now(),
      };
    }
    catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = getPokemon;
