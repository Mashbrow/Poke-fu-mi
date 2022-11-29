"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findPokemonsByUserId = exports.findPokemonWeaknessById = exports.updatePokemon = exports.findPokemonByName = exports.findPokemonById = exports.addPokemon = exports.listPokemonsName = exports.listPokemons = void 0;
const pokemonRepository_1 = __importDefault(require("./pokemonRepository"));
const pokemonRepository = new pokemonRepository_1.default();
const findPokemonById = (id) => {
    return pokemonRepository.getPokemonById(id);
};
exports.findPokemonById = findPokemonById;
const findPokemonByName = (name) => {
    return pokemonRepository.getPokemonByName(name);
};
exports.findPokemonByName = findPokemonByName;
const listPokemons = () => {
    return pokemonRepository.getAllPokemons();
};
exports.listPokemons = listPokemons;
const listPokemonsName = () => {
    return pokemonRepository.getAllPokemonsName();
};
exports.listPokemonsName = listPokemonsName;
const findPokemonsByUserId = (id) => {
    return pokemonRepository.getAllPokemonsByUserId(id);
};
exports.findPokemonsByUserId = findPokemonsByUserId;
const findPokemonWeaknessById = (id) => {
    return pokemonRepository.getPokemonWeaknessById(id);
};
exports.findPokemonWeaknessById = findPokemonWeaknessById;
const addPokemon = (newPokemon) => {
    pokemonRepository.createPokemon(newPokemon);
    return pokemonRepository.getAllPokemons();
};
exports.addPokemon = addPokemon;
const updatePokemon = (id, updatePokemon) => {
    pokemonRepository.updatePokemon(id, updatePokemon);
    return pokemonRepository.getAllPokemons();
};
exports.updatePokemon = updatePokemon;
//# sourceMappingURL=pokemonController.js.map