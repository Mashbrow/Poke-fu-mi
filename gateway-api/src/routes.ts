import * as express from "express"
import * as GatewayController from "./gatewayController"
import { PokemonOwned, PokemonTemplate, User } from './model'
import {myTeam} from "./gatewayController";

export const register = ( app: express.Application ) => {
  app.get('/', (req, res) => res.send('Hello World!'));

  app.get('/mypokemons/:token', (req, res) => {
    const token: string = req.params.token
    const tokenResponse = GatewayController.unmakeToken(token)
    switch (tokenResponse.code) {
      case 200 : return GatewayController.findMyPokemons(tokenResponse.content).then(value => {
      switch (value.code) {
        case 200 :
          return res.status(value.code).json(value.content)
        default :
          return res.status(value.code).json({"Error": value.errorMessage})
      }
    })
      default : return res.status(tokenResponse.code).json({"Error": tokenResponse.errorMessage})
    }



  })

  app.post('/buypokemon/:token', (req, res) => {
    const token: string = req.params.token
    const tokenResponse = GatewayController.unmakeToken(token)
    switch (tokenResponse.code) {
      case 200 : const pokemonShopId: number = (req.query as any).pokemonShopId
         return GatewayController.buyPokemon(tokenResponse.content, pokemonShopId).then(value => {
          switch (value.code) {
        case 200 :
          return res.status(value.code).json(value.content)
        default :
          return res.status(value.code).json({"Error": value.errorMessage})
      }})
      default : return res.status(tokenResponse.code).json({"Error": tokenResponse.errorMessage})
        }})


  app.post('/register', (req, res) => {
    const newUser: User = req.body
    GatewayController.register(newUser).then(value => {
      res.status(200).json("Votre id:" + value.toString())
    })
  })

  //GET MYTEAM (myId en entrée)
  app.get('/myteam/:token', (req, res) => {
    const token: string = req.params.token
    const tokenResponse = GatewayController.unmakeToken(token)
    switch(tokenResponse.code){
      case 200: return GatewayController.myTeam(tokenResponse.content).then(value => {
        return res.status(200).json(value.content)
    })
      default: return res.status(tokenResponse.code).json({"Error": tokenResponse.errorMessage})
    }
  })

  //POST UN DE MES POKEMONS DANS MA TEAM (myId, IdPokemon, NumeroSlot)

  app.post('/myteam/:token', (req, res) => {
    const token: string = req.params.token
    const tokenResponse = GatewayController.unmakeToken(token)
    switch (tokenResponse.code){
      case 200:
        const myPokemonId: string = (req.query as any).pokemonId
        const myTeamSlot: string = (req.query as any).slot
        return GatewayController.addToTeam(tokenResponse.content, myPokemonId, myTeamSlot).then(value => {
          return res.status(200).json(value.content)
        })
      default:
        return res.status(tokenResponse.code).json({"Error":tokenResponse.errorMessage})
    }
  })

  //SERVICE LOGIN(monId,MonMDP) et les identifiants dans le service USER

  app.get('/login', (req, res) => {
    const id: string = (req.query as any).myId
    const password: string = (req.query as any).myPassword
    return GatewayController.makeToken(id, password).then(value => {
      switch (value.code){
        case 200 :
          return res.status(value.code).json(value.content)
        default :
          return res.status(value.code).json(value.errorMessage)
      }
    })
  })

  app.get('/untoken/:token', (req, res) => {
    const token: string = req.params.token
    const responseToken = GatewayController.unmakeToken(token)
    switch (responseToken.code){
      case 200:
        return res.status(responseToken.code).json(responseToken.content)
      default:
        return res.status(responseToken.code).json(responseToken.content)
    }
  })
}

