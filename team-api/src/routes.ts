import * as express from "express"
import * as TeamController from "./teamController"
import { PokemonOwned, User, Team} from './model'

export const register = ( app: express.Application ) => {
  app.get('/', (req, res) => res.send('Hello World!'));

  app.get('/teams', (req, res) => {
    res.status(200).json(TeamController.listTeams())
  })

  app.get('/team/:id', (req, res) => {
    const teamId: number = parseFloat(req.params.id)
    res.status(200).json(TeamController.findTeamById(teamId))
  })

  app.post('/team/:id', (req, res) => {
    const teamId: number = parseFloat(req.params.id)
    res.status(200).json(TeamController.addTeam(teamId))
  })
  app.post('/addtoteam', (req, res) => {
    const myId: string = (req.query as any).userId
    const myPokemonId: string = (req.query as any).pokemonId
    const myTeamSlot:string = (req.query as any).slot
    res.status(200).json(TeamController.addToTeam(myId,myPokemonId,myTeamSlot))
  })

}
