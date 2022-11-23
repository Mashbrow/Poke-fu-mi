import Database from 'better-sqlite3'
import fs from 'fs'
import { Pokemon } from './model'
import {findPokemonByName} from "./templateController"; //← not needed right now
import * as utils from "./utils"

export default class TemplateRepository {
  db: Database.Database

  constructor() {
    this.db = new Database('db/templates.db', { verbose: console.log });
    this.applyMigrations()
    const init_statement = this.db.prepare("INSERT INTO templates (name,type) VALUES (?, ?)")
    init_statement.run("Pikachu","Elec")
  }

  //Table creation
  applyMigrations(){
    const applyMigration = (path: string) => {
      const migration = fs.readFileSync(path, 'utf8')
      this.db.exec(migration)
    }
    
    const testRow = this.db.prepare("SELECT name FROM sqlite_schema WHERE type = 'table' AND name = 'templates'").get()

    if (!testRow){
      console.log('Applying migrations on DB templates...')
      const migrations = ['db/migrations/init.sql'] 	 
      migrations.forEach(applyMigration)
    }
  }

  getAllPokemons(): Pokemon[] {
    const statement = this.db.prepare("SELECT * FROM templates")
    const rows: Pokemon[] = statement.all()
    return rows
  }

  getAllPokemonsName(): string[] {
    const statement = this.db.prepare("SELECT name FROM templates")
    const rows: string[] = statement.all()
    return rows
  }

  getPokemonById(pokemonId: number) {
	const statement = this.db
        .prepare("SELECT * FROM templates WHERE pokemon_id = ?")
	const rows: Pokemon[] = statement.get(pokemonId)
	return rows    
  }

  getPokemonByName(name: string) {
    const statement = this.db.prepare("SELECT * FROM templates WHERE name=?")
    console.log("\nQuery ")
    console.log(statement.all(name))
    const rows: Pokemon[] = statement.all(name)
    console.log("\nRepository src")
    console.log(rows)
    return rows
  }

  getPokemonWeaknessById(id: number) {
    const statement = this.db.prepare("SELECT * FROM templates WHERE pokemon_id=?")
    let rows: Pokemon[] = statement.all(id)
    return utils.getWeakness(rows[0].type)
  }

  createPokemon(pokemon: Pokemon) {
    const statement =
    this.db.prepare("INSERT INTO templates (name, type, evolution_id, xp, xp_max, level, level_max, hp_max, capacite_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
    return statement.run(pokemon.name,pokemon.type,pokemon.evolution_id,pokemon.xp, pokemon.xp_max, pokemon.level, pokemon.level_max, pokemon.hp_max, pokemon.capacite_id).lastInsertRowid
  }

  updatePokemon(pokemonId: number, pokemon: Pokemon) {
      const statement = 
      this.db.prepare("UPDATE templates SET name, type, evolution_id, xp, xp_max, level, level_max, hp_max, capacite_id WHERE pokemon_id="+pokemonId.toString())
      return statement.run(pokemon.name,pokemon.type,pokemon.evolution_id,pokemon.xp, pokemon.xp_max, pokemon.level, pokemon.level_max, pokemon.hp_max, pokemon.capacite_id).lastInsertRowid
  }
}
