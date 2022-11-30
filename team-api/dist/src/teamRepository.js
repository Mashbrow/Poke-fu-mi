"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const fs_1 = __importDefault(require("fs"));
class TeamRepository {
    constructor() {
        this.db = new better_sqlite3_1.default('db/team.db', { verbose: console.log });
        this.applyMigrations();
    }
    //Table creation
    applyMigrations() {
        const applyMigration = (path) => {
            const migration = fs_1.default.readFileSync(path, 'utf8');
            this.db.exec(migration);
        };
        const testRow = this.db.prepare("SELECT name FROM sqlite_schema WHERE type = 'table' AND name = 'teams'").get();
        if (!testRow) {
            console.log('Applying migrations on DB team...');
            const migrations = ['db/migrations/init.sql'];
            migrations.forEach(applyMigration);
        }
    }
    getAllTeams() {
        const statement = this.db.prepare("SELECT * FROM teams");
        const rows = statement.all();
        return rows;
    }
    getTeamById(userId) {
        const statement = this.db
            .prepare("SELECT * FROM teams WHERE user_id = ?");
        const rows = statement.get(userId);
        return [rows.pokemon1, rows.pokemon2, rows.pokemon3, rows.pokemon4, rows.pokemon5];
    }
    createTeam(userId) {
        const statement = this.db.prepare("INSERT INTO teams (user_id) VALUES (?)");
        return statement.run(userId).lastInsertRowid;
    }
    updateTeam(userId, team) {
        const statement = this.db.prepare("UPDATE teams SET user_id,pokemon1,pokemon2,pokemon3,pokemon4,pokemon5 WHERE team_id=" + userId.toString());
        return statement.run(team.user_id, team.pokemon1, team.pokemon2, team.pokemon3, team.pokemon4, team.pokemon5).lastInsertRowid;
    }
    addToTeam(userId, pokemonId, slot) {
        console.log("Repository");
        console.log(userId);
        console.log(pokemonId);
        console.log(slot);
        switch (slot) {
            case "1":
                const statement1 = this.db.prepare("UPDATE teams SET pokemon1 = (?) WHERE user_id=" + userId);
                return statement1.run(pokemonId);
            case "2":
                const statement2 = this.db.prepare("UPDATE teams SET pokemon2 = (?) WHERE user_id=" + userId);
                return statement2.run(pokemonId);
            case "3":
                const statement3 = this.db.prepare("UPDATE teams SET pokemon3 = (?) WHERE user_id=" + userId);
                return statement3.run(pokemonId);
            case "4":
                const statement4 = this.db.prepare("UPDATE teams SET pokemon4 = (?) WHERE user_id=" + userId);
                return statement4.run(pokemonId);
            case "5":
                const statement5 = this.db.prepare("UPDATE teams SET pokemon5 = (?) WHERE user_id=" + userId);
                return statement5.run(pokemonId);
        }
    }
}
exports.default = TeamRepository;
//# sourceMappingURL=teamRepository.js.map