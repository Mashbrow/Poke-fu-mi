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
    return userRepository.getAllUsers()
}


const updateUser = (id: number, updateUser: User) => {
  userRepository.updateUser(id, updateUser)
  return userRepository.getAllUsers()
}


export { listUsers, addUser, findUserById, updateUser }
