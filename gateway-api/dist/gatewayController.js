"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buyPokemon = exports.register = exports.findMyPokemons = void 0;
const axios_1 = __importDefault(require("axios"));
const findMyPokemons = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const resp = axios_1.default.get('http://localhost:5003/pokemonbyuserid/' + id.toString()).then((response) => response.data);
    return resp;
});
exports.findMyPokemons = findMyPokemons;
const register = (newUser) => __awaiter(void 0, void 0, void 0, function* () {
    const resp = axios_1.default.post('http://localhost:5002/user', newUser).then(response => response.data);
    return resp;
});
exports.register = register;
const buyPokemon = (myId, tradeId) => __awaiter(void 0, void 0, void 0, function* () {
    return axios_1.default.get('http://localhost:5002/user/' + myId.toString()).then(resUser => {
        return axios_1.default.get('http://localhost:5000/shop/' + tradeId.toString()).then(resTrade => {
            const trade = resTrade.data;
            return axios_1.default.get('http://localhost:5005/template/' + trade.pokemon_id.toString()).then(resPokemon => {
                let user = resUser.data;
                let pokemonTemplate = resPokemon.data;
                if (user.money >= trade.price) {
                    const pokemon = {
                        name: pokemonTemplate.name,
                        type: pokemonTemplate.type,
                        evolution_id: pokemonTemplate.evolution_id,
                        xp: pokemonTemplate.xp,
                        xp_max: pokemonTemplate.xp_max,
                        level: pokemonTemplate.level,
                        level_max: pokemonTemplate.level_max,
                        hp_max: pokemonTemplate.hp_max,
                        capacite_id: pokemonTemplate.capacite_id,
                        owner_id: myId
                    };
                    user.money -= trade.price;
                    ///TODO: Ajouter une requete au service user pour modifier l'argent du user.
                    return axios_1.default.post('http://localhost:5003/pokemon', pokemon).then(_ => {
                        return axios_1.default.get('http://localhost:5003/pokemonbyuserid/' + myId.toString()).then(value => {
                            return value.data;
                        });
                    });
                }
                else {
                    return axios_1.default.get('http://localhost:5003/pokemonbyuserid/' + myId.toString()).then(value => value.data);
                }
            });
        });
    });
});
exports.buyPokemon = buyPokemon;
//# sourceMappingURL=gatewayController.js.map