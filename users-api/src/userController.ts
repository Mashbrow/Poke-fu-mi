import {Pokemon,User,Team} from './model'
import UserRepository from './userRepository'
import axios from "axios";

const userRepository = new UserRepository()

const findUserById = (id:number) => {
  return userRepository.getUserById(id)
}

const listUsers = () => {
  return userRepository.getAllUsers()
}


const addUser = async (newUser: User) => {
    const id = userRepository.createUser(newUser)
    const resp = axios.post('http://localhost:5001/team/'+ id.toString()).then(value=>value.data)
    console.log(id)
    return id
}


const updateUser = (id: number, updateUser: User) => {
  userRepository.updateUser(id, updateUser)
  return userRepository.getAllUsers()
}

const reduceMoney = (id: number, amount:number) => {
    userRepository.addMoney(id,-amount)
    return userRepository.getUserById(id)
}


export { listUsers, addUser, findUserById, updateUser, reduceMoney }
