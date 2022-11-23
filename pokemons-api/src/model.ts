interface PokemonShop {
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
    price : number
}

interface PokemonOwned {
    id?: number;
    name: string;
    type : string;
    evolution_id : number,
    xp : number ,
    xp_max : number,
    level : number,
    level_max : number,
    hp_max : number,
    capacite_id : number,
    owner_id : number
}

export { PokemonShop, PokemonOwned }
  