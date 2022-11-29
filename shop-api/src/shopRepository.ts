import Database from 'better-sqlite3'
import fs from 'fs'
import { Pokemon, Trade } from './model'
import * as utils from "./utils"

export default class ShopRepository {
  db: Database.Database

  constructor() {
    this.db = new Database('db/shop.db', { verbose: console.log });
    this.applyMigrations()
  }

  //Table creation
  applyMigrations(){
    const applyMigration = (path: string) => {
      const migration = fs.readFileSync(path, 'utf8')
      this.db.exec(migration)
    }
    
    const testRow = this.db.prepare("SELECT name FROM sqlite_schema WHERE type = 'table' AND name = 'shop'").get()

    if (!testRow){
      console.log('Applying migrations on DB shop...')
      const migrations = ['db/migrations/init.sql'] 	 
      migrations.forEach(applyMigration)
    }
  }

  getAllTrades(): Trade[] {
    const statement = this.db.prepare("SELECT * FROM shop")
    const rows: Trade[] = statement.all()
    return rows
  }


  getTradeById(tradeId: number) {
	const statement = this.db
        .prepare("SELECT * FROM shop WHERE trade_id = ?")
	const rows: Trade[] = statement.get(tradeId)
	return rows    
  }

  createTrade(trade: Trade) {
    const statement =
    this.db.prepare("INSERT INTO shop (pokemon_id, price) VALUES (?, ?)")
    return statement.run(trade.pokemon_id,trade.price).lastInsertRowid
  }
}
