import {PokemonOwned,User,Team} from './model'
import TeamRepository from './teamRepository'

const teamRepository = new TeamRepository()


const findTeamById = (id:number) => {
  return teamRepository.getTeamById(id)
}

const listTeams = () => {
  return teamRepository.getAllTeams()
}

const addToTeam = (user_id:number, pokemon_id:number, slot:number) => {
  teamRepository.addToTeam(user_id,pokemon_id,slot)
  return teamRepository.getAllTeams()
}


const addTeam = (teamId:number) => {
  teamRepository.createTeam(teamId)
  return teamRepository.getAllTeams()
}


const updateTeam = (id: number, updateTeam: Team) => {
  teamRepository.updateTeam(id, updateTeam)
  return teamRepository.getAllTeams()
}





export { listTeams, addTeam, findTeamById, updateTeam, addToTeam}
