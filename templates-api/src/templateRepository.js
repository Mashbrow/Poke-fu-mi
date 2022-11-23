"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const fs_1 = __importDefault(require("fs"));
class PokemonRepository {
    constructor() {
        this.db = new better_sqlite3_1.default('db/shop.db', { verbose: console.log });
        this.applyMigrations();
        const init_statement = this.db.prepare("INSERT INTO Pokemons (name,type) VALUES (?, ?)");
        init_statement.run("Pikachu", "Elec");
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
    getAllPokemons() {
        const statement = this.db.prepare("SELECT * FROM shop");
        const rows = statement.all();
        return rows;
    }
    getAllPokemonsName() {
        const statement = this.db.prepare("SELECT name FROM shop");
        const rows = statement.all();
        return rows;
    }
    getPokemonById(pokemonId) {
        const statement = this.db
            .prepare("SELECT * FROM shop WHERE pokemon_id = ?");
        const rows = statement.get(pokemonId);
        return rows;
    }
    getPokemonByName(name) {
        const statement = this.db.prepare("SELECT * FROM shop WHERE name=?");
        console.log("\nQuery ");
        console.log(statement.all(name));
        const rows = statement.all(name);
        console.log("\nRepository src");
        console.log(rows);
        return rows;
    }
    createPokemon(pokemon) {
        const statement = this.db.prepare("INSERT INTO shop (name, type, evolution_id, xp, xp_max, hp_max, capacite_id) VALUES (?, ?, ?, ?, ?)");
        return statement.run(pokemon.name, pokemon.type, pokemon.evolution_id, pokemon.xp, pokemon.xp_max, pokemon.hp_max, pokemon.capacite_id).lastInsertRowid;
    }
    updatePokemon(pokemonId, pokemon) {
        const statement = this.db.prepare("UPDATE shop SET name=?, type=?, evolution_id=?, xp=?, xp_max=?, hp_max=?, capacite_id=? WHERE pokemon_id=" + pokemonId.toString());
        return statement.run(pokemon.name, pokemon.type, pokemon.evolution_id, pokemon.xp, pokemon.xp_max, pokemon.hp_max, pokemon.capacite_id).lastInsertRowid;
    }
}
exports.default = PokemonRepository;
