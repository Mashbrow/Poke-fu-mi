import {PokemonOwned, PokemonTemplate, User, Trade} from './model'
import axios from "axios";
import jwt from 'jsonwebtoken';


const findMyPokemons = async (id:string) : Promise<PokemonOwned> => {
  const resp = axios.get('http://localhost:5003/pokemonbyuserid/'+id).then((response)=>response.data)
  return resp
}

const register = async (newUser:User) : Promise<User> => {
  const resp = axios.post('http://localhost:5002/user', newUser).then(response=>response.data)
  return resp
}


const buyPokemon = async (myId : string , tradeId:number) : Promise<void|PokemonOwned[]> => {
  return axios.get('http://localhost:5002/user/'+myId).then(resUser=>{
    return axios.get('http://localhost:5000/shop/'+tradeId.toString()).then(resTrade=> {
      const trade : Trade = resTrade.data
      return axios.get('http://localhost:5005/template/'+trade.pokemon_id.toString()).then(resPokemon=>{
        let user : User=resUser.data
        let pokemonTemplate : PokemonTemplate = resPokemon.data
        if (user.money >= trade.price){
          const pokemon : PokemonOwned = {
            name : pokemonTemplate.name,
            type : pokemonTemplate.type,
            evolution_id : pokemonTemplate.evolution_id,
            xp : pokemonTemplate.xp ,
            xp_max : pokemonTemplate.xp_max,
            level : pokemonTemplate.level,
            level_max : pokemonTemplate.level_max,
            hp_max : pokemonTemplate.hp_max,
            capacite_id : pokemonTemplate.capacite_id,
            owner_id : Number(myId)
          }
          user.money -= trade.price
          const new_user = axios.post('http://localhost:5002/user/reducemoney/?id='+myId+'&amount='+trade.price.toString())
          return axios.post('http://localhost:5003/pokemon', pokemon).then( _ => {
            return axios.get('http://localhost:5003/pokemonbyuserid/'+myId).then(value=>{
               return value.data})
          })
        }
        else {
          return axios.get('http://localhost:5003/pokemonbyuserid/'+myId).then(value=>value.data)
        }
        })
    })
  })
}

const myTeam = async (userId:string) : Promise<PokemonOwned[]> => {
  return axios.get('http://localhost:5001/team/'+userId).then((value) => value.data)
}

const addToTeam = async (userId:string, pokemonId:number, slot:number) : Promise<PokemonOwned[]> => {
  return axios.post('http://localhost:5001/addtoteam/?userId=' + userId+'&pokemonId='+pokemonId.toString()+'&slot='+slot.toString()).then(value=>{
    return myTeam(userId)
  })
}
const makeToken = async (userId:string, password:string) : Promise<string> => {
  return axios.get('http://localhost:5002/user/'+userId).then(value=>{
    if (value.data.password == password) {
      const jsonwebtoken_1 = require("jsonwebtoken");
      const privateKey = "thisisasecretkey";
      const payload = {
          id: userId.toString(),
      }
      let token = jwt.sign(payload, privateKey);
      return token
    }
    else {
      return "id ou mdp incorrect"
    }
  })
}

const unmakeToken = (token:string) : string => {
  const privateKey = "thisisasecretkey";
  let data = jwt.verify(token, privateKey) as jwt.JwtPayload;
  return data['id']
}

export {findMyPokemons,register, buyPokemon, myTeam, addToTeam, makeToken, unmakeToken}
