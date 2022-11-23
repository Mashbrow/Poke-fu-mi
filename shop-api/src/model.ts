interface Pokemon {
    id: number;
    name: string;
    type : string;
    evolution_id : number,
    xp : number ,
    xp_max : number,
    level : number,
    level_max : number,
    hp_max : number,
    capacite_id : number,
}

interface Trade {
    id?:number,
    pokemon_id: number,
    price:number
}

export { Pokemon, Trade }
  