import { combineReducers } from 'redux'
import lobbyReducer from './lobby'
import { routerStateReducer } from 'redux-router'

const reducer = combineReducers({
  router: routerStateReducer,
  lobby: lobbyReducer,
})

export default reducer
