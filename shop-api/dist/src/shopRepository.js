"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const fs_1 = __importDefault(require("fs"));
class ShopRepository {
    constructor() {
        this.db = new better_sqlite3_1.default('db/shop.db', { verbose: console.log });
        this.applyMigrations();
    }
    //Table creation
    applyMigrations() {
        const applyMigration = (path) => {
            const migration = fs_1.default.readFileSync(path, 'utf8');
            this.db.exec(migration);
        };
        const testRow = this.db.prepare("SELECT name FROM sqlite_schema WHERE type = 'table' AND name = 'shop'").get();
        if (!testRow) {
            console.log('Applying migrations on DB shop...');
            const migrations = ['db/migrations/init.sql'];
            migrations.forEach(applyMigration);
        }
    }
    getAllTrades() {
        const statement = this.db.prepare("SELECT * FROM shop");
        const rows = statement.all();
        return rows;
    }
    getTradeById(tradeId) {
        const statement = this.db
            .prepare("SELECT * FROM shop WHERE trade_id = ?");
        const rows = statement.get(tradeId);
        return rows;
    }
    createTrade(trade) {
        const statement = this.db.prepare("INSERT INTO shop (pokemon_id, price) VALUES (?, ?)");
        return statement.run(trade.pokemon_id, trade.price).lastInsertRowid;
    }
}
exports.default = ShopRepository;
//# sourceMappingURL=shopRepository.js.map