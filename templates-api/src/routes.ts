import * as express from "express"
import * as TemplateController from "./templateController"
import { Pokemon } from './model'

export const register = ( app: express.Application ) => {
  app.get('/', (req, res) => res.send('Hello World!'));

  app.get('/templates', (req, res) => {
    res.status(200).json(TemplateController.listPokemons())
  })

  app.get('/template/:id', (req, res) => {
    const pokemonId: number = parseFloat(req.params.id)
    res.status(200).json(TemplateController.findPokemonById(pokemonId))
  })

  app.get('/templatebyname/:name', (req, res) => {
    const name: string = req.params.name
    res.status(200).json(TemplateController.findPokemonByName(name))
  })

  app.get('/templateweaknessbyid/:id', (req, res) => {
    const pokemon_id: number = parseFloat(req.params.id)
    res.status(200).json(TemplateController.findPokemonWeaknessById(pokemon_id))
  })

  app.post('/template', (req, res) => {
    const newPokemon: Pokemon = req.body
    res.status(200).json(TemplateController.addPokemon(newPokemon))
  })

}
