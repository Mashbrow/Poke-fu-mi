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
exports.updateUser = exports.findUserById = exports.addUser = exports.listUsers = void 0;
const userRepository_1 = __importDefault(require("./userRepository"));
const axios_1 = __importDefault(require("axios"));
const userRepository = new userRepository_1.default();
const findUserById = (id) => {
    return userRepository.getUserById(id);
};
exports.findUserById = findUserById;
const listUsers = () => {
    return userRepository.getAllUsers();
};
exports.listUsers = listUsers;
const addUser = (newUser) => __awaiter(void 0, void 0, void 0, function* () {
    const id = userRepository.createUser(newUser);
    const resp = axios_1.default.post('http://localhost:5001/team/' + id.toString()).then(value => value.data);
    return userRepository.getAllUsers();
});
exports.addUser = addUser;
const updateUser = (id, updateUser) => {
    userRepository.updateUser(id, updateUser);
    return userRepository.getAllUsers();
};
exports.updateUser = updateUser;
//# sourceMappingURL=userController.js.map