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
const ShopController = __importStar(require("./shopController"));
const register = (app) => {
    app.get('/', (req, res) => res.send('Hello World!'));
    app.get('/shop', (req, res) => {
        res.status(200).json(ShopController.listTrades());
    });
    app.get('/shop/:id', (req, res) => {
        const pokemonId = parseFloat(req.params.id);
        res.status(200).json(ShopController.findTradeById(pokemonId));
    });
    app.post('/shop', (req, res) => {
        const trade = req.body;
        res.status(200).json(ShopController.addTrade(trade));
    });
};
exports.register = register;
//# sourceMappingURL=routes.js.map