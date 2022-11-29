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
        const id = GatewayController.unmakeToken(token);
        GatewayController.findMyPokemons(id).then(value => { res.status(200).json(value); });
    });
    app.post('/buypokemon/:token', (req, res) => {
        const token = req.params.token;
        const myId = GatewayController.unmakeToken(token);
        const pokemonShopId = req.query.pokemonShopId;
        GatewayController.buyPokemon(myId, pokemonShopId).then(value => {
            res.status(200).json(value);
        });
    });
    app.post('/register', (req, res) => {
        const newUser = req.body;
        GatewayController.register(newUser).then(value => { res.status(200).json("Votre id:" + value.toString()); });
    });
    //GET MYTEAM (myId en entrée)
    app.get('/myteam/:token', (req, res) => {
        const token = req.params.token;
        const myId = GatewayController.unmakeToken(token);
        GatewayController.myTeam(myId).then(value => { res.status(200).json(value); });
    });
    //POST UN DE MES POKEMONS DANS MA TEAM (myId, IdPokemon, NumeroSlot)
    app.post('/myteam/:token', (req, res) => {
        const token = req.params.token;
        const myId = GatewayController.unmakeToken(token);
        const myPokemonId = req.query.pokemonShopId;
        const myTeamSlot = req.query.slot;
        GatewayController.addToTeam(myId, myPokemonId, myTeamSlot).then(value => { res.status(200).json(value); });
    });
    //SERVICE LOGIN(monId,MonMDP) et les identifiants dans le service USER
    app.get('/login', (req, res) => {
        const id = req.query.myId;
        const password = req.query.myPassword;
        return GatewayController.makeToken(id, password).then(value => { res.status(200).json(value); });
    });
    app.get('/untoken/:token', (req, res) => {
        const token = req.params.token;
        return res.status(200).json(GatewayController.unmakeToken(token));
    });
    //TODO changer register pour ajouter le mdp
    //TODO RAJOUTER LA GESTION DES ERREURS
};
exports.register = register;
//# sourceMappingURL=routes.js.map