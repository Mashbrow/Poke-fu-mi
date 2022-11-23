import * as express from "express"
import * as TeamController from "./teamController"
import { Pokemon, User, Team} from './model'

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

}
