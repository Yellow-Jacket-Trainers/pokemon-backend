'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const pokemonSchema = new Schema({
  name: {type: String, required: true},
  types: {type: Object, required: true},
  hp: {type: Number},
  abilities: {type: Object},
  attacks: {type: Object},
  weaknesses: {type: Object},
  image: {type: String},
  MVP: {type: Boolean, default: false},
  email: {type: String}
});

const Pokemon = mongoose.model('Pokemon', pokemonSchema);

module.exports = Pokemon;
