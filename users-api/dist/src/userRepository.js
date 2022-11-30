"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const fs_1 = __importDefault(require("fs"));
class UserRepository {
    constructor() {
        this.db = new better_sqlite3_1.default('db/users.db', { verbose: console.log });
        this.applyMigrations();
    }
    //Table creation
    applyMigrations() {
        const applyMigration = (path) => {
            const migration = fs_1.default.readFileSync(path, 'utf8');
            this.db.exec(migration);
        };
        const testRow = this.db.prepare("SELECT name FROM sqlite_schema WHERE type = 'table' AND name = 'users'").get();
        if (!testRow) {
            console.log('Applying migrations on DB user...');
            const migrations = ['db/migrations/init.sql'];
            migrations.forEach(applyMigration);
        }
    }
    getAllUsers() {
        const statement = this.db.prepare("SELECT * FROM users");
        const rows = statement.all();
        return rows;
    }
    getUserById(userId) {
        const statement = this.db
            .prepare("SELECT * FROM users WHERE user_id = ?");
        const rows = statement.get(userId);
        return rows;
    }
    createUser(user) {
        const statement = this.db.prepare("INSERT INTO users (name, password) VALUES (?,?)");
        const id = statement.run(user.name, user.password).lastInsertRowid;
        return id;
    }
    updateUser(userId, user) {
        const statement = this.db.prepare("UPDATE users SET user_id, name WHERE user_id=" + userId.toString());
        return statement.run(user.id, user.name).lastInsertRowid;
    }
    addMoney(userId, amount) {
        const statement1 = this.db
            .prepare("SELECT * FROM users WHERE user_id = ?");
        const rows = statement1.get(userId);
        const previous_amount = rows.money;
        const new_amount = previous_amount + amount;
        const statement = this.db.prepare("UPDATE users SET money = (?) WHERE user_id=" + userId.toString());
        return statement.run(new_amount);
    }
}
exports.default = UserRepository;
//# sourceMappingURL=userRepository.js.map