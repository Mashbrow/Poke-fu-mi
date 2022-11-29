import Database from 'better-sqlite3'
import fs from 'fs'
import { PokemonOwned, User, Team } from './model'
import * as utils from "./utils"

export default class TeamRepository {
  db: Database.Database

  constructor() {
    this.db = new Database('db/team.db', { verbose: console.log });
    this.applyMigrations()
  }

  //Table creation
  applyMigrations(){
    const applyMigration = (path: string) => {
      const migration = fs.readFileSync(path, 'utf8')
      this.db.exec(migration)
    }
    
    const testRow = this.db.prepare("SELECT name FROM sqlite_schema WHERE type = 'table' AND name = 'teams'").get()

    if (!testRow){
      console.log('Applying migrations on DB team...')
      const migrations = ['db/migrations/init.sql'] 	 
      migrations.forEach(applyMigration)
      const statement =
      this.db.prepare("INSERT INTO teams (pokemon1) VALUES (?)")
      statement.run(1)

    }
  }

  getAllTeams(): Team[] {
    const statement = this.db.prepare("SELECT * FROM teams")
    const rows: Team[] = statement.all()
    return rows
  }

  getTeamById(teamId: number) {
	const statement = this.db
        .prepare("SELECT * FROM teams WHERE team_id = ?")
	const rows: Team = statement.get(teamId)
	return [rows.pokemon1, rows.pokemon2, rows.pokemon3, rows.pokemon4, rows.pokemon5]
  }

  createTeam(teamId:number) {
    const statement =
    this.db.prepare("INSERT INTO teams (team_id) VALUES (?)")
    return statement.run(teamId).lastInsertRowid
  }

  updateTeam(teamId: number, team: Team) {
      const statement = 
      this.db.prepare("UPDATE teams SET team_id,pokemon1,pokemon2,pokemon3,pokemon4,pokemon5 WHERE team_id="+teamId.toString())
      return statement.run(team.id,team.pokemon1,team.pokemon2,team.pokemon3,team.pokemon4,team.pokemon5).lastInsertRowid
  }
  addToTeam(userId: number, pokemonId:number, slot:number) {
    switch (slot.toString()) {
      case "1":
        const statement1 =
        this.db.prepare("UPDATE teams SET pokemon1 = (?) WHERE team_id="+userId.toString())
        return statement1.run(pokemonId)
      case "2":
        const statement2 =
        this.db.prepare("UPDATE teams SET pokemon2 = (?) WHERE team_id="+userId.toString())
        return statement2.run(pokemonId)
      case "3":
        const statement3 =
        this.db.prepare("UPDATE teams SET pokemon3 = (?) WHERE team_id="+userId.toString())
        return statement3.run(pokemonId)
      case "4":
        const statement4 =
        this.db.prepare("UPDATE teams SET pokemon4 = (?) WHERE team_id="+userId.toString())
        return statement4.run(pokemonId)
      case "5":
        const statement5 =
        this.db.prepare("UPDATE teams SET pokemon5 = (?) WHERE team_id="+userId.toString())
        return statement5.run(pokemonId)
    }
  }
}
