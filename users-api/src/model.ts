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

interface Team {
    id: number
    pokemon1?: Pokemon
    pokemon2?: Pokemon
    pokemon3?: Pokemon
    pokemon4?: Pokemon
    pokemon5?: Pokemon
}

interface User {
    id?: number,
    password?: string
    name: string,
    money: number
}

export { Pokemon, Team, User }
  