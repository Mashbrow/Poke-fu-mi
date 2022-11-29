interface PokemonOwned {
    id: number;
    name: string;
    type? : string;
    evolution_id? : number,
    xp? : number ,
    xp_max ?: number,
    level? : number,
    level_max? : number,
    hp_max? : number,
    capacite_id? : number,
}

interface Team {
    id: number
    user_id:number
    pokemon1?: PokemonOwned
    pokemon2?: PokemonOwned
    pokemon3?: PokemonOwned
    pokemon4?: PokemonOwned
    pokemon5?: PokemonOwned
}

interface User {
    id: number
    name: string
    money: number
}

export { PokemonOwned, Team, User }
  