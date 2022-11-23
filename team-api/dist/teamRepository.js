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
    getTeamById(teamId) {
        const statement = this.db
            .prepare("SELECT * FROM teams WHERE team_id = ?");
        const rows = statement.get(teamId);
        return rows;
    }
    createTeam(teamId) {
        const statement = this.db.prepare("INSERT INTO teams (team_id) VALUES (?)");
        return statement.run(teamId).lastInsertRowid;
    }
    updateTeam(teamId, team) {
        const statement = this.db.prepare("UPDATE shop SET team_id,pokemon1,pokemon2,pokemon3,pokemon4,pokemon5 WHERE team_id=" + teamId.toString());
        return statement.run(team.id, team.pokemon1, team.pokemon2, team.pokemon3, team.pokemon4, team.pokemon5).lastInsertRowid;
    }
}
exports.default = TeamRepository;
//# sourceMappingURL=teamRepository.js.map