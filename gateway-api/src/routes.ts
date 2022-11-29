import * as express from "express"
import * as GatewayController from "./gatewayController"
import { PokemonOwned, PokemonTemplate, User } from './model'
import {myTeam} from "./gatewayController";

export const register = ( app: express.Application ) => {
  app.get('/', (req, res) => res.send('Hello World!'));

  app.get('/mypokemons/:token', (req, res) => {
    const token: string = req.params.token
    const id = GatewayController.unmakeToken(token)
    GatewayController.findMyPokemons(id).then(value => { res.status(200).json(value)})
  })

  app.post('/buypokemon/:token', (req, res) => {
    const token: string = req.params.token
    const myId: string = GatewayController.unmakeToken(token)
    const pokemonShopId: number = (req.query as any).pokemonShopId
    GatewayController.buyPokemon(myId,pokemonShopId).then(value => {
      res.status(200).json(value)})
  })

  app.post('/register', (req, res) => {
    const newUser: User = req.body
    GatewayController.register(newUser).then(value=> {res.status(200).json("Votre id:"+value.toString())})
  })

  //GET MYTEAM (myId en entrée)
  app.get('/myteam/:token', (req, res) => {
    const token: string = req.params.token
    const myId: string = GatewayController.unmakeToken(token)
    GatewayController.myTeam(myId).then(value=>{res.status(200).json(value)})
  })

  //POST UN DE MES POKEMONS DANS MA TEAM (myId, IdPokemon, NumeroSlot)
  app.post('/myteam/:token', (req, res) => {
    const token: string = req.params.token
    const myId: string = GatewayController.unmakeToken(token)
    const myPokemonId: number = (req.query as any).pokemonShopId
    const myTeamSlot:number = (req.query as any).slot
    GatewayController.addToTeam(myId,myPokemonId,myTeamSlot).then(value=>{res.status(200).json(value)})
  })

  //SERVICE LOGIN(monId,MonMDP) et les identifiants dans le service USER
  app.get('/login',(req,res) => {
    const id: string = (req.query as any).myId
    const password: string = (req.query as any).myPassword
    return GatewayController.makeToken(id, password).then(value=>{res.status(200).json(value)})
  })

  app.get('/untoken/:token', (req,res) => {
    const token : string = req.params.token
    return res.status(200).json(GatewayController.unmakeToken(token))
  })

  //TODO changer register pour ajouter le mdp

  //TODO RAJOUTER LA GESTION DES ERREURS

}

