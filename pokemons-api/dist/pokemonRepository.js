"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const fs_1 = __importDefault(require("fs"));
const utils = __importStar(require("./utils"));
class PokemonRepository {
    constructor() {
        this.db = new better_sqlite3_1.default('db/pokemon.db', { verbose: console.log });
        this.applyMigrations();
        /*
        const init_statement = this.db.prepare("INSERT INTO pokemon (name,type,owner_id) VALUES (?, ?, ?)")
        init_statement.run("Pikachu","Elec",1)*/
    }
    //Table creation
    applyMigrations() {
        const applyMigration = (path) => {
            const migration = fs_1.default.readFileSync(path, 'utf8');
            this.db.exec(migration);
        };
        const testRow = this.db.prepare("SELECT name FROM sqlite_schema WHERE type = 'table' AND name = 'pokemon'").get();
        if (!testRow) {
            console.log('Applying migrations on DB pokemon...');
            const migrations = ['db/migrations/init.sql'];
            migrations.forEach(applyMigration);
        }
    }
    getAllPokemons() {
        const statement = this.db.prepare("SELECT * FROM pokemon");
        const rows = statement.all();
        return rows;
    }
    getAllPokemonsName() {
        const statement = this.db.prepare("SELECT name FROM pokemon");
        const rows = statement.all();
        return rows;
    }
    getPokemonById(pokemonId) {
        const statement = this.db
            .prepare("SELECT * FROM pokemon WHERE pokemon_id = ?");
        const rows = statement.get(pokemonId);
        return rows;
    }
    getPokemonByName(name) {
        const statement = this.db.prepare("SELECT * FROM pokemon WHERE name=?");
        console.log("\nQuery ");
        console.log(statement.all(name));
        const rows = statement.all(name);
        console.log("\nRepository src");
        console.log(rows);
        return rows;
    }
    getAllPokemonsByUserId(id) {
        const statement = this.db.prepare("SELECT * FROM pokemon WHERE owner_id=?");
        let rows = statement.all(id);
        return rows;
    }
    getPokemonWeaknessById(id) {
        const statement = this.db.prepare("SELECT * FROM pokemon WHERE pokemon_id=?");
        let rows = statement.all(id);
        return utils.getWeakness(rows[0].type);
    }
    createPokemon(pokemon) {
        const statement = this.db.prepare("INSERT INTO pokemon (name, type, evolution_id, xp, xp_max, level, level_max, hp_max, capacite_id,owner_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        return statement.run(pokemon.name, pokemon.type, pokemon.evolution_id, pokemon.xp, pokemon.xp_max, pokemon.level, pokemon.level_max, pokemon.hp_max, pokemon.capacite_id, pokemon.owner_id).lastInsertRowid;
    }
    updatePokemon(pokemonId, pokemon) {
        const statement = this.db.prepare("UPDATE pokemon SET name, type, evolution_id, xp, xp_max, level, level_max, hp_max, capacite_id WHERE pokemon_id=" + pokemonId.toString());
        return statement.run(pokemon.name, pokemon.type, pokemon.evolution_id, pokemon.xp, pokemon.xp_max, pokemon.level, pokemon.level_max, pokemon.hp_max, pokemon.capacite_id).lastInsertRowid;
    }
}
exports.default = PokemonRepository;
//# sourceMappingURL=pokemonRepository.js.map