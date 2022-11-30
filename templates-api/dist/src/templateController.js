"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findPokemonWeaknessById = exports.updatePokemon = exports.findPokemonByName = exports.findPokemonById = exports.addPokemon = exports.listPokemonsName = exports.listPokemons = void 0;
const templateRepository_1 = __importDefault(require("./templateRepository"));
const templateRepository = new templateRepository_1.default();
const findPokemonById = (id) => {
    return templateRepository.getPokemonById(id);
};
exports.findPokemonById = findPokemonById;
const findPokemonByName = (name) => {
    return templateRepository.getPokemonByName(name);
};
exports.findPokemonByName = findPokemonByName;
const listPokemons = () => {
    return templateRepository.getAllPokemons();
};
exports.listPokemons = listPokemons;
const listPokemonsName = () => {
    return templateRepository.getAllPokemonsName();
};
exports.listPokemonsName = listPokemonsName;
const findPokemonWeaknessById = (id) => {
    return templateRepository.getPokemonWeaknessById(id);
};
exports.findPokemonWeaknessById = findPokemonWeaknessById;
const addPokemon = (newPokemon) => {
    templateRepository.createPokemon(newPokemon);
    return templateRepository.getAllPokemons();
};
exports.addPokemon = addPokemon;
const updatePokemon = (id, updatePokemon) => {
    templateRepository.updatePokemon(id, updatePokemon);
    return templateRepository.getAllPokemons();
};
exports.updatePokemon = updatePokemon;
//# sourceMappingURL=templateController.js.map