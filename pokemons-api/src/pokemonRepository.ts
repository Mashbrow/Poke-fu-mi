import Database from 'better-sqlite3'
import fs from 'fs'
import { PokemonOwned, PokemonShop } from './model'
import {findPokemonByName} from "./pokemonController"; //← not needed right now
import * as utils from "./utils"

export default class PokemonRepository {
  db: Database.Database

  constructor() {
    this.db = new Database('db/pokemon.db', { verbose: console.log });
    this.applyMigrations()
    /*
    const init_statement = this.db.prepare("INSERT INTO pokemon (name,type,owner_id) VALUES (?, ?, ?)")
    init_statement.run("Pikachu","Elec",1)*/
  }

  //Table creation
  applyMigrations(){
    const applyMigration = (path: string) => {
      const migration = fs.readFileSync(path, 'utf8')
      this.db.exec(migration)
    }
    
    const testRow = this.db.prepare("SELECT name FROM sqlite_schema WHERE type = 'table' AND name = 'pokemon'").get()

    if (!testRow){
      console.log('Applying migrations on DB pokemon...')
      const migrations = ['db/migrations/init.sql'] 	 
      migrations.forEach(applyMigration)
    }
  }

  getAllPokemons(): PokemonOwned[] {
    const statement = this.db.prepare("SELECT * FROM pokemon")
    const rows: PokemonOwned[] = statement.all()
    return rows
  }

  getAllPokemonsName(): string[] {
    const statement = this.db.prepare("SELECT name FROM pokemon")
    const rows: string[] = statement.all()
    return rows
  }

  getPokemonById(pokemonId: number) {
	const statement = this.db
        .prepare("SELECT * FROM pokemon WHERE pokemon_id = ?")
	const rows: PokemonOwned[] = statement.get(pokemonId)
	return rows    
  }

  getPokemonByName(name: string) {
    const statement = this.db.prepare("SELECT * FROM pokemon WHERE name=?")
    console.log("\nQuery ")
    console.log(statement.all(name))
    const rows: PokemonOwned[] = statement.all(name)
    console.log("\nRepository src")
    console.log(rows)
    return rows
  }

  getAllPokemonsByUserId(id:number) {
    const statement = this.db.prepare("SELECT * FROM pokemon WHERE owner_id=?")
    let rows: PokemonOwned[] = statement.all(id)
    return rows
  }

  getPokemonWeaknessById(id: number) {
    const statement = this.db.prepare("SELECT * FROM pokemon WHERE pokemon_id=?")
    let rows: PokemonOwned[] = statement.all(id)
    return utils.getWeakness(rows[0].type)
  }

  createPokemon(pokemon: PokemonOwned) {
    const statement =
    this.db.prepare("INSERT INTO pokemon (name, type, evolution_id, xp, xp_max, level, level_max, hp_max, capacite_id,owner_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
    return statement.run(pokemon.name,pokemon.type,pokemon.evolution_id,pokemon.xp, pokemon.xp_max, pokemon.level, pokemon.level_max, pokemon.hp_max, pokemon.capacite_id, pokemon.owner_id).lastInsertRowid
  }

  updatePokemon(pokemonId: number, pokemon: PokemonOwned) {
      const statement = 
      this.db.prepare("UPDATE pokemon SET name, type, evolution_id, xp, xp_max, level, level_max, hp_max, capacite_id WHERE pokemon_id="+pokemonId.toString())
      return statement.run(pokemon.name,pokemon.type,pokemon.evolution_id,pokemon.xp, pokemon.xp_max, pokemon.level, pokemon.level_max, pokemon.hp_max, pokemon.capacite_id).lastInsertRowid
  }
}
