import * as express from "express"
import * as userController from "./userController"
import { Pokemon, User, Team} from './model'

export const register = ( app: express.Application ) => {
  app.get('/', (req, res) => res.send('Hello World!'));

  app.get('/users', (req, res) => {
    res.status(200).json(userController.listUsers())
  })

  app.get('/user/:id', (req, res) => {
    const userId: number = parseFloat(req.params.id)
    res.status(200).json(userController.findUserById(userId))
  })

  app.post('/user', (req, res) => {
    const newUser: User = req.body
    res.status(200).json(userController.addUser(newUser))
  })

}
