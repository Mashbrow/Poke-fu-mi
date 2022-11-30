"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToTeam = exports.updateTeam = exports.findTeamById = exports.addTeam = exports.listTeams = void 0;
const teamRepository_1 = __importDefault(require("./teamRepository"));
const teamRepository = new teamRepository_1.default();
const findTeamById = (id) => {
    return teamRepository.getTeamById(id);
};
exports.findTeamById = findTeamById;
const listTeams = () => {
    return teamRepository.getAllTeams();
};
exports.listTeams = listTeams;
const addToTeam = (user_id, pokemon_id, slot) => {
    console.log("Controller");
    console.log(user_id);
    console.log(pokemon_id);
    console.log(slot);
    teamRepository.addToTeam(user_id, pokemon_id, slot);
    return teamRepository.getAllTeams();
};
exports.addToTeam = addToTeam;
const addTeam = (teamId) => {
    teamRepository.createTeam(teamId);
    return teamRepository.getAllTeams();
};
exports.addTeam = addTeam;
const updateTeam = (id, updateTeam) => {
    teamRepository.updateTeam(id, updateTeam);
    return teamRepository.getAllTeams();
};
exports.updateTeam = updateTeam;
//# sourceMappingURL=teamController.js.map