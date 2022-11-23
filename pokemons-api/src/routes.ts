import * as express from "express"
import * as ShopController from "./pokemonController"
import { PokemonOwned, PokemonTemplate } from './model'

export const register = ( app: express.Application ) => {
  app.get('/', (req, res) => res.send('Hello World!'));

  app.get('/pokemon', (req, res) => {
    res.status(200).json(ShopController.listPokemons())
  })

  app.get('/pokemon/:id', (req, res) => {
    const pokemonId: number = parseFloat(req.params.id)
    res.status(200).json(ShopController.findPokemonById(pokemonId))
  })

  app.get('/pokemonbyname/:name', (req, res) => {
    const name: string = req.params.name
    res.status(200).json(ShopController.findPokemonByName(name))
  })

  app.get('/pokemonbyuserid/:id', (req, res) => {
    const id: number = parseFloat(req.params.id)
    res.status(200).json(ShopController.findPokemonsByUserId(id))
  })

  app.get('/pokemonweaknessbyid/:id', (req, res) => {
    const pokemon_id: number = parseFloat(req.params.id)
    res.status(200).json(ShopController.findPokemonWeaknessById(pokemon_id))
  })

  app.post('/pokemon', (req, res) => {
    const newPokemon: PokemonOwned = req.body
    res.status(200).json(ShopController.addPokemon(newPokemon))
  })

}
