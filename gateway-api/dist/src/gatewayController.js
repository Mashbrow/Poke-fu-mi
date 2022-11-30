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
exports.unmakeToken = exports.makeToken = exports.addToTeam = exports.myTeam = exports.buyPokemon = exports.register = exports.findMyPokemons = void 0;
const axios_1 = __importDefault(require("axios"));
const jsonwebtoken_2 = __importDefault(require("jsonwebtoken"));
const findMyPokemons = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return axios_1.default.get('http://localhost:5003/pokemonbyuserid/' + id)
        .then((response) => {
        return { code: 200, content: response.data };
    })
        .catch((e) => {
        return { code: 401, errorMessage: "Error while calling pokemons-api" };
    });
});
exports.findMyPokemons = findMyPokemons;
const register = (newUser) => __awaiter(void 0, void 0, void 0, function* () {
    const resp = axios_1.default.post('http://localhost:5002/user', newUser).then(response => response.data);
    return resp;
});
exports.register = register;
const buyPokemon = (myId, tradeId) => __awaiter(void 0, void 0, void 0, function* () {
    return axios_1.default.get('http://localhost:5002/user/' + myId).then(resUser => {
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
                        owner_id: Number(myId)
                    };
                    user.money -= trade.price;
                    const new_user = axios_1.default.post('http://localhost:5002/user/reducemoney/?id=' + myId + '&amount=' + trade.price.toString()).catch(e => {
                        return { code: 401, errorMessage: "Error while reducing money from user (users-api)" };
                    });
                    return axios_1.default.post('http://localhost:5003/pokemon', pokemon).then(_ => {
                        return axios_1.default.get('http://localhost:5003/pokemonbyuserid/' + myId).then(value => {
                            return { code: 200, content: value.data };
                        }).catch(e => {
                            return { code: 401, errorMessage: "Error while getting pokemons owned by user (pokemons-api)" };
                        });
                    }).catch(e => {
                        return { code: 401, errorMessage: "Error while adding new owned pokemon (pokemons-api)" };
                    });
                }
                else {
                    return { code: 401, errorMessage: "Not enough money" };
                }
            }).catch(e => {
                return { code: 401, errorMessage: "Error while getting pokemon template (templates-api)" };
            });
        }).catch(e => {
            return { code: 401, errorMessage: "Error while getting trade (shop-api)" };
        });
    }).catch(e => {
        return { code: 401, errorMessage: "Error while getting user (users-api)" };
    });
});
exports.buyPokemon = buyPokemon;
//TODO test myTeam
const myTeam = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return axios_1.default.get('http://localhost:5001/team/' + userId)
        .then((value) => { return { code: 200, content: value.data }; })
        .catch(e => {
        return { code: 401, errorMessage: "Error while calling team-api" };
    });
});
exports.myTeam = myTeam;
const addToTeam = (userId, pokemonId, slot) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(pokemonId);
    console.log(slot);
    return axios_1.default.post('http://localhost:5001/addtoteam/?userId=' + userId + '&pokemonId=' + pokemonId + '&slot=' + slot).then(value => {
        return myTeam(userId);
    }).catch(e => {
        return { code: 401, errorMessage: "Error while calling team-api" };
    });
});
exports.addToTeam = addToTeam;
const makeToken = (userId, password) => __awaiter(void 0, void 0, void 0, function* () {
    return axios_1.default.get('http://localhost:5002/user/' + userId).then(value => {
        if (value.data.password == password) {
            const jsonwebtoken_1 = require("jsonwebtoken");
            const privateKey = "thisisasecretkey";
            const payload = {
                id: userId.toString(),
            };
            let token = jsonwebtoken_2.default.sign(payload, privateKey);
            return { code: 200, content: token };
        }
        else {
            return { code: 401, errorMessage: "Incorrect username or password" };
        }
    }).catch(e => {
        return { code: 401, errorMessage: "Error while calling users-api" };
    });
});
exports.makeToken = makeToken;
const unmakeToken = (token) => {
    const privateKey = "thisisasecretkey";
    if (jsonwebtoken_2.default.verify(token, privateKey)) {
        let data = jsonwebtoken_2.default.verify(token, privateKey);
        return { code: 200, content: data['id'] };
    }
    else {
        return { code: 401, errorMessage: "Bad Token" };
    }
};
exports.unmakeToken = unmakeToken;
//# sourceMappingURL=gatewayController.js.map