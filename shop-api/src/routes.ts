import * as express from "express"
import * as ShopController from "./shopController"
import { Pokemon,Trade } from './model'

export const register = ( app: express.Application ) => {
  app.get('/', (req, res) => res.send('Hello World!'));

  app.get('/shop', (req, res) => {
    res.status(200).json(ShopController.listTrades())
  })

  app.get('/shop/:id', (req, res) => {
    const pokemonId: number = parseFloat(req.params.id)
    res.status(200).json(ShopController.findTradeById(pokemonId))
  })

  app.post('/shop', (req, res) => {
    const pokemon_id: number = (req.query as any).pokemon_id
    const price: number = (req.query as any).price
    const newTrade: Trade = {pokemon_id:pokemon_id,price:price}
    res.status(200).json(ShopController.addTrade(newTrade))
  })

}
