import {Pokemon,Trade} from './model'
import ShopRepository from './shopRepository'

const shopRepository = new ShopRepository()


const findTradeById = (id:number) => {
  return shopRepository.getTradeById(id)
}


const listTrades = () => {
  return shopRepository.getAllTrades()
}

const addTrade = (newTrade: Trade) => {
  shopRepository.createTrade(newTrade)
  return shopRepository.getAllTrades()
}





export { listTrades, addTrade, findTradeById }
