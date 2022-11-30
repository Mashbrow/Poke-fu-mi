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
    const trade : Trade = req.body
    res.status(200).json(ShopController.addTrade(trade))
  })

}
