'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const pokemonSchema = new Schema({
  name: {type: String, required: true},
  hp: {type: Number, required: true},
  abilities: {type: Object, required: true},
  attacks: {type: Object, required: true},
  weaknesses: {type: Object, required: true},
  image: {type: String, required: true},
  email: {type: String}
});

const Pokemon = mongoose.model('Pokemon', pokemonSchema);

module.exports = Pokemon;
