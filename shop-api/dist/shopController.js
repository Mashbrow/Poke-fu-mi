"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findTradeById = exports.addTrade = exports.listTrades = void 0;
const shopRepository_1 = __importDefault(require("./shopRepository"));
const shopRepository = new shopRepository_1.default();
const findTradeById = (id) => {
    return shopRepository.getTradeById(id);
};
exports.findTradeById = findTradeById;
const listTrades = () => {
    return shopRepository.getAllTrades();
};
exports.listTrades = listTrades;
const addTrade = (newTrade) => {
    shopRepository.createTrade(newTrade);
    return shopRepository.getAllTrades();
};
exports.addTrade = addTrade;
//# sourceMappingURL=shopController.js.map