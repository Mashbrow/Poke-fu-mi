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
const buyPokemon = (myId, pokemonShopId) => __awaiter(void 0, void 0, void 0, function* () {
    return axios_1.default.get('http://localhost:5002/user/' + myId.toString()).then(resUser => {
        console.log(resUser.data);
        return axios_1.default.get('http://localhost:5000/shop/' + pokemonShopId.toString()).then(resPokemon => {
            console.log(resPokemon.data);
            let user = resUser.data;
            const pokemonShop = resPokemon.data;
            if (user.money >= pokemonShop.price) {
                const pokemon = {
                    name: pokemonShop.name,
                    type: pokemonShop.type,
                    evolution_id: pokemonShop.evolution_id,
                    xp: pokemonShop.xp,
                    xp_max: pokemonShop.xp_max,
                    level: pokemonShop.level,
                    level_max: pokemonShop.level_max,
                    hp_max: pokemonShop.hp_max,
                    capacite_id: pokemonShop.capacite_id,
                    owner_id: myId
                };
                user.money -= pokemonShop.price;
                return axios_1.default.post('http://localhost:5003/pokemon', pokemon).then(_ => {
                    console.log("post done");
                    return axios_1.default.get('http://localhost:5003/pokemonbyuserid/' + myId.toString()).then(value => {
                        console.log(value.data);
                        return value.data;
                    });
                });
            }
            else {
                console.log("ELSE!!!!!!!!");
                return axios_1.default.get('http://localhost:5003/pokemonbyuserid/' + myId.toString()).then(value => value.data);
            }
        });
    });
});
exports.buyPokemon = buyPokemon;
//# sourceMappingURL=gatewayController.js.map