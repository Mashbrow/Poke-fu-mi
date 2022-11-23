import {PokemonOwned, PokemonTemplate, User, Trade} from './model'
import axios from "axios";


const findMyPokemons = async (id:number) : Promise<PokemonOwned> => {
  const resp = axios.get('http://localhost:5003/pokemonbyuserid/'+id.toString()).then((response)=>response.data)
  return resp
}

const register = async (newUser:User) : Promise<User> => {
  const resp = axios.post('http://localhost:5002/user', newUser).then(response=>response.data)
  return resp
}


const buyPokemon = async (myId : number , tradeId:number) : Promise<void|PokemonOwned[]> => {
  return axios.get('http://localhost:5002/user/'+myId.toString()).then(resUser=>{
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
            owner_id : myId
          }
          user.money -= trade.price
          ///TODO: Ajouter une requete au service user pour modifier l'argent du user.

          return axios.post('http://localhost:5003/pokemon', pokemon).then( _ => {
            return axios.get('http://localhost:5003/pokemonbyuserid/'+myId.toString()).then(value=>{
               return value.data})
          })
        }
        else {
          return axios.get('http://localhost:5003/pokemonbyuserid/'+myId.toString()).then(value=>value.data)
        }
        })
    })
  })
}

export {findMyPokemons,register, buyPokemon}
