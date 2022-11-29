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
    userController.addUser(newUser).then(value=> res.status(200).json(value))
  })

  app.post('/user/reducemoney/', (req, res) => {
    const user_id: number = Number((req.query as any).id)
    const amount: number = (req.query as any).amount
    res.status(200).json(userController.reduceMoney(user_id, amount))
  })


}
