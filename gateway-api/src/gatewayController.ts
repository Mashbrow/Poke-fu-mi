import {PokemonOwned, PokemonTemplate, User, Trade, ResponseType} from './model'
import axios from "axios";
import jwt from 'jsonwebtoken';


const findMyPokemons = async (id:string) : Promise<ResponseType<PokemonOwned>> => {
  return axios.get('http://localhost:5003/pokemonbyuserid/'+id)
      .then((response)=> {
        return {code:200, content:response.data}
      })
      .catch((e)=>{
        return {code:401, errorMessage:"Error while calling pokemons-api"}
      })


}

const register = async (newUser:User) : Promise<User> => {
  const resp = axios.post('http://localhost:5002/user', newUser).then(response=>response.data)
  return resp
}


const buyPokemon = async (myId : string , tradeId:number) : Promise<ResponseType<PokemonOwned[]>> => {
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
          const new_user = axios.post('http://localhost:5002/user/reducemoney/?id='+myId+'&amount='+trade.price.toString()).catch(e=>{
            return {code:401, errorMessage:"Error while reducing money from user (users-api)"}
          })
          return axios.post('http://localhost:5003/pokemon', pokemon).then( _ => {
            return axios.get('http://localhost:5003/pokemonbyuserid/'+myId).then(value=>{
               return {code:200, content:value.data}}).catch(e=>{
                 return {code:401, errorMessage:"Error while getting pokemons owned by user (pokemons-api)"}
            })
          }).catch(e=>{
            return {code:401, errorMessage:"Error while adding new owned pokemon (pokemons-api)"}
          })
        }
        else {
          return {code:401, errorMessage:"Not enough money"}
        }
        }).catch(e=>{
          return {code:401, errorMessage:"Error while getting pokemon template (templates-api)"}
      })
    }).catch(e=>{
      return {code:401, errorMessage:"Error while getting trade (shop-api)"}
    })
  }).catch(e=>{
    return {code:401, errorMessage:"Error while getting user (users-api)"}
  })
}


const myTeam = async (userId:string) : Promise<ResponseType<PokemonOwned[]>> => {
  return axios.get('http://localhost:5001/team/'+userId)
      .then((value) => { return {code:200, content:value.data}})
      .catch(e=>{
        return {code:401, errorMessage:"Error while calling team-api"}
      }
  )
}

const addToTeam = async (userId:string, pokemonId:string, slot:string) : Promise<ResponseType<PokemonOwned[]>> => {
  return axios.post('http://localhost:5001/addtoteam/?userId=' + userId+'&pokemonId='+pokemonId+'&slot='+slot).then(value=>{
    return myTeam(userId)
  }).catch(e=>{
    return {code:401, errorMessage:"Error while calling team-api"}
  })
}
const makeToken = async (userId:string, password:string) : Promise<ResponseType<string>> => {
  return axios.get('http://localhost:5002/user/'+userId).then(value=>{
    if (value.data.password == password) {
      const jsonwebtoken_1 = require("jsonwebtoken");
      const privateKey = "thisisasecretkey";
      const payload = {
          id: userId.toString(),
      }
      let token = jwt.sign(payload, privateKey);
      return {code:200, content:token}
    }
    else {
      return {code:401, errorMessage:"Incorrect username or password"}
    }
  }).catch(e=>{
    return {code:401, errorMessage:"Error while calling users-api"}
  })
}

const unmakeToken = (token:string) : ResponseType<string> => {
  const privateKey = "thisisasecretkey";
  if (jwt.verify(token, privateKey)){
    let data = jwt.verify(token, privateKey) as jwt.JwtPayload;
    return {code:200, content:data['id']}
  }
  else{
    return {code:401,errorMessage:"Bad Token"}
  }
}

export {findMyPokemons,register, buyPokemon, myTeam, addToTeam, makeToken, unmakeToken}
