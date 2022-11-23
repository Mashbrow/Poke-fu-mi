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
        const init_statement = this.db.prepare("INSERT INTO users (name) VALUES ( ?)");
        init_statement.run("Sacha");
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
        const statement = this.db.prepare("INSERT INTO users (name, money) VALUES (?,?)");
        const id = statement.run(user.name, user.money).lastInsertRowid;
        return id;
    }
    updateUser(userId, user) {
        const statement = this.db.prepare("UPDATE shop SET user_id, name WHERE user_id=" + userId.toString());
        return statement.run(user.id, user.name).lastInsertRowid;
    }
}
exports.default = UserRepository;
//# sourceMappingURL=userRepository.js.map