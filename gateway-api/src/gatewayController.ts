import {PokemonOwned, PokemonShop, User} from './model'
import axios from "axios";


const findMyPokemons = async (id:number) : Promise<PokemonOwned> => {
  const resp = axios.get('http://localhost:5003/pokemonbyuserid/'+id.toString()).then((response)=>response.data)
  return resp
}

const register = async (newUser:User) : Promise<User> => {
  const resp = axios.post('http://localhost:5002/user', newUser).then(response=>response.data)
  return resp
}


const buyPokemon = async (myId : number , pokemonShopId:number) : Promise<void|PokemonOwned[]> => {
  return axios.get('http://localhost:5002/user/'+myId.toString()).then(resUser=>{
    console.log(resUser.data)
    return axios.get('http://localhost:5000/shop/'+pokemonShopId.toString()).then(resPokemon=> {
      console.log(resPokemon.data)
      let user : User=resUser.data
      const pokemonShop : PokemonShop = resPokemon.data
      if (user.money >= pokemonShop.price){
        const pokemon : PokemonOwned = {
          name : pokemonShop.name,
          type : pokemonShop.type,
          evolution_id : pokemonShop.evolution_id,
          xp : pokemonShop.xp ,
          xp_max : pokemonShop.xp_max,
          level : pokemonShop.level,
          level_max : pokemonShop.level_max,
          hp_max : pokemonShop.hp_max,
          capacite_id : pokemonShop.capacite_id,
          owner_id : myId
        }
        user.money -= pokemonShop.price
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
}

export {findMyPokemons,register, buyPokemon}
