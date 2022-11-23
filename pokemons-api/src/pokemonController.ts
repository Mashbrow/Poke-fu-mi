import {PokemonOwned, PokemonShop} from './model'
import PokemonRepository from './pokemonRepository'

const pokemonRepository = new PokemonRepository()


const findPokemonById = (id:number) => {
  return pokemonRepository.getPokemonById(id)
}

const findPokemonByName = (name: string) => {
  return pokemonRepository.getPokemonByName(name)
}

const listPokemons = () => {
  return pokemonRepository.getAllPokemons()
}

const listPokemonsName = () => {
  return pokemonRepository.getAllPokemonsName()
}

const findPokemonsByUserId = (id:number) => {
  return pokemonRepository.getAllPokemonsByUserId(id)
}

const findPokemonWeaknessById = (id : number) => {
  return pokemonRepository.getPokemonWeaknessById(id)
}

const addPokemon = (newPokemon: PokemonOwned) => {
  pokemonRepository.createPokemon(newPokemon)
  return pokemonRepository.getAllPokemons()
}


const updatePokemon = (id: number, updatePokemon: PokemonOwned) => {
  pokemonRepository.updatePokemon(id, updatePokemon)
  return pokemonRepository.getAllPokemons()
}





export { listPokemons, listPokemonsName, addPokemon, findPokemonById, findPokemonByName, updatePokemon, findPokemonWeaknessById, findPokemonsByUserId }
