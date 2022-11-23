import * as express from "express"
import * as GatewayController from "./gatewayController"
import { PokemonOwned, PokemonShop, User } from './model'

export const register = ( app: express.Application ) => {
  app.get('/', (req, res) => res.send('Hello World!'));

  app.get('/mypokemons/:id', (req, res) => {
    const myId: number = parseFloat(req.params.id)
    GatewayController.findMyPokemons(myId).then(value => { res.status(200).json(value)})
  })

  app.post('/buypokemon/', (req, res) => {
    const myId: number = (req.query as any).myId
    const pokemonShopId: number = (req.query as any).pokemonShopId
    GatewayController.buyPokemon(myId,pokemonShopId).then(value => {
      console.log("out of gateway controller")
      console.log(value)
      res.status(200).json(value)})
  })

  app.post('/register', (req, res) => {
    const newUser: User = req.body
    GatewayController.register(newUser).then(value=> {res.status(200).json(value)})
  })


}

