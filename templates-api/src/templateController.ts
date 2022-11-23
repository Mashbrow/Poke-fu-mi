import {Pokemon} from './model'
import TemplateRepository from './templateRepository'

const templateRepository = new TemplateRepository()


const findPokemonById = (id:number) => {
  return templateRepository.getPokemonById(id)
}

const findPokemonByName = (name: string) => {
  return templateRepository.getPokemonByName(name)
}

const listPokemons = () => {
  return templateRepository.getAllPokemons()
}

const listPokemonsName = () => {
  return templateRepository.getAllPokemonsName()
}

const findPokemonWeaknessById = (id : number) => {
  return templateRepository.getPokemonWeaknessById(id)
}

const addPokemon = (newPokemon: Pokemon) => {
  templateRepository.createPokemon(newPokemon)
  return templateRepository.getAllPokemons()
}


const updatePokemon = (id: number, updatePokemon: Pokemon) => {
  templateRepository.updatePokemon(id, updatePokemon)
  return templateRepository.getAllPokemons()
}





export { listPokemons, listPokemonsName, addPokemon, findPokemonById, findPokemonByName, updatePokemon, findPokemonWeaknessById }
