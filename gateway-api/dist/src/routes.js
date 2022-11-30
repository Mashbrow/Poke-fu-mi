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
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const GatewayController = __importStar(require("./gatewayController"));
const register = (app) => {
    app.get('/', (req, res) => res.send('Hello World!'));
    app.get('/mypokemons/:token', (req, res) => {
        const token = req.params.token;
        const tokenResponse = GatewayController.unmakeToken(token);
        switch (tokenResponse.code) {
            case 200: return GatewayController.findMyPokemons(tokenResponse.content).then(value => {
                switch (value.code) {
                    case 200:
                        return res.status(value.code).json(value.content);
                    default:
                        return res.status(value.code).json({ "Error": value.errorMessage });
                }
            });
            default: return res.status(tokenResponse.code).json({ "Error": tokenResponse.errorMessage });
        }
    });
    app.post('/buypokemon/:token', (req, res) => {
        const token = req.params.token;
        const tokenResponse = GatewayController.unmakeToken(token);
        switch (tokenResponse.code) {
            case 200:
                const pokemonShopId = req.query.pokemonShopId;
                return GatewayController.buyPokemon(tokenResponse.content, pokemonShopId).then(value => {
                    switch (value.code) {
                        case 200:
                            return res.status(value.code).json(value.content);
                        default:
                            return res.status(value.code).json({ "Error": value.errorMessage });
                    }
                });
            default: return res.status(tokenResponse.code).json({ "Error": tokenResponse.errorMessage });
        }
    });
    app.post('/register', (req, res) => {
        const newUser = req.body;
        GatewayController.register(newUser).then(value => {
            res.status(200).json("Votre id:" + value.toString());
        });
    });
    //GET MYTEAM (myId en entrée)
    app.get('/myteam/:token', (req, res) => {
        const token = req.params.token;
        const tokenResponse = GatewayController.unmakeToken(token);
        switch (tokenResponse.code) {
            case 200: return GatewayController.myTeam(tokenResponse.content).then(value => {
                console.log(value.content);
                return res.status(200).json(value.content);
            });
            default: return res.status(tokenResponse.code).json({ "Error": tokenResponse.errorMessage });
        }
    });
    //POST UN DE MES POKEMONS DANS MA TEAM (myId, IdPokemon, NumeroSlot)
    app.post('/myteam/:token', (req, res) => {
        const token = req.params.token;
        const tokenResponse = GatewayController.unmakeToken(token);
        switch (tokenResponse.code) {
            case 200:
                const myPokemonId = req.query.pokemonId;
                const myTeamSlot = req.query.slot;
                return GatewayController.addToTeam(tokenResponse.content, myPokemonId, myTeamSlot).then(value => {
                    return res.status(200).json(value);
                });
            default:
                return res.status(tokenResponse.code).json({ "Error": tokenResponse.errorMessage });
        }
    });
    //SERVICE LOGIN(monId,MonMDP) et les identifiants dans le service USER
    app.get('/login', (req, res) => {
        const id = req.query.myId;
        const password = req.query.myPassword;
        return GatewayController.makeToken(id, password).then(value => {
            switch (value.code) {
                case 200:
                    return res.status(value.code).json(value.content);
                default:
                    return res.status(value.code).json(value.errorMessage);
            }
        });
    });
    app.get('/untoken/:token', (req, res) => {
        const token = req.params.token;
        const responseToken = GatewayController.unmakeToken(token);
        switch (responseToken.code) {
            case 200:
                return res.status(responseToken.code).json(responseToken.content);
            default:
                return res.status(responseToken.code).json(responseToken.content);
        }
    });
};
exports.register = register;
//TODO CHANGER LES CODES DES MESSAGES D ERREUR
//# sourceMappingURL=routes.js.map