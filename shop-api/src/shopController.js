"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePokemon = exports.findPokemonByName = exports.findPokemonById = exports.addPokemon = exports.listPokemonsName = exports.listPokemons = void 0;
const shopRepository_1 = __importDefault(require("./shopRepository"));
const shopRepository = new shopRepository_1.default();
const axios = require('axios');
const pokemonsUrl = 'https://pokeapi.co/api/v2/pokemon/';
const typedPokemons = [];
const findPokemonById = (id) => {
    return shopRepository.getPokemonById(id);
};
exports.findPokemonById = findPokemonById;
const findPokemonByName = (name) => {
    return shopRepository.getPokemonByName(name);
};
exports.findPokemonByName = findPokemonByName;
const listPokemons = () => {
    return shopRepository.getAllPokemons();
};
exports.listPokemons = listPokemons;
const listPokemonsName = () => {
    return shopRepository.getAllPokemonsName();
};
exports.listPokemonsName = listPokemonsName;
const addPokemon = (newPokemon) => {
    shopRepository.createPokemon(newPokemon);
    return shopRepository.getAllPokemons();
};
exports.addPokemon = addPokemon;
const updatePokemon = (id, updatePokemon) => {
    shopRepository.updatePokemon(id, updatePokemon);
    return shopRepository.getAllPokemons();
};
exports.updatePokemon = updatePokemon;
const getPokemons = () => {
    return axios.get(pokemonsUrl);
};
