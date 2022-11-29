import Database from 'better-sqlite3'
import fs from 'fs'
import { Pokemon, User, Team } from './model'
import * as utils from "./utils"

export default class UserRepository {
  db: Database.Database

  constructor() {
    this.db = new Database('db/users.db', { verbose: console.log });
    this.applyMigrations()
    const init_statement = this.db.prepare("INSERT INTO users (name) VALUES ( ?)")
    init_statement.run("Sacha")
  }

  //Table creation
  applyMigrations(){
    const applyMigration = (path: string) => {
      const migration = fs.readFileSync(path, 'utf8')
      this.db.exec(migration)
    }
    
    const testRow = this.db.prepare("SELECT name FROM sqlite_schema WHERE type = 'table' AND name = 'users'").get()

    if (!testRow){
      console.log('Applying migrations on DB user...')
      const migrations = ['db/migrations/init.sql'] 	 
      migrations.forEach(applyMigration)
    }
  }

  getAllUsers(): User[] {
    const statement = this.db.prepare("SELECT * FROM users")
    const rows: User[] = statement.all()
    return rows
  }

  getUserById(userId: number) {
	const statement = this.db
        .prepare("SELECT * FROM users WHERE user_id = ?")
	const rows: User[] = statement.get(userId)
	return rows
  }

  createUser(user: User) {
    const statement =
    this.db.prepare("INSERT INTO users (name, password) VALUES (?,?)")
    const id = statement.run(user.name,user.password).lastInsertRowid as number
    return id
  }

  updateUser(userId: number, user: User) {
      const statement = 
      this.db.prepare("UPDATE users SET user_id, name WHERE user_id="+userId.toString())
      return statement.run(user.id,user.name).lastInsertRowid
  }
  addMoney(userId:number, amount:number) {
    const statement1 = this.db
        .prepare("SELECT * FROM users WHERE user_id = ?")
	const rows: User = statement1.get(userId)
    const previous_amount : number = rows.money
    const new_amount = previous_amount + amount
    const statement = this.db.prepare("UPDATE users SET money = (?) WHERE user_id=" + userId.toString())
    return statement.run(new_amount)
  }
}
