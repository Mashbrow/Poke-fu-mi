import {Pokemon,User,Team} from './model'
import TeamRepository from './teamRepository'

const teamRepository = new TeamRepository()


const findTeamById = (id:number) => {
  return teamRepository.getTeamById(id)
}

const listTeams = () => {
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





export { listTeams, addTeam, findTeamById, updateTeam }
