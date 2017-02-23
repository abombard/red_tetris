import { combineReducers } from 'redux'
import lobbyReducer from './lobby'
import gridReducer from './GridReducer'
import { routerStateReducer } from 'redux-router'

const reducer = combineReducers({
  router: routerStateReducer,
  lobby: lobbyReducer,
  grid: gridReducer,
})

export default reducer
