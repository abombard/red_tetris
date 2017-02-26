import * as actions from '../actions'
import { GET_MAP, getMap } from '../actions/getMap'
import { push } from 'redux-router'

export const listen = (store, socket) => {
  socket.on('lobby', (data) => {
    switch (data.type) {
    case 'REFRESH_ROOMS':
      store.dispatch(actions.refreshRooms(data.rooms))
      break
    case 'RESP_CREATE_ROOM':
      if (data.response === true) {
        store.dispatch(push({ pathname: `/${data.name}[anonymous]` }))
      }
      break
    case 'JOIN_ROOM_FAIL':
      console.log(`failed to join room: ${data.reason}`)
      store.dispatch(push({ pathname: '/' }))
    default:
      break
    }
  })

  socket.on('room', (data) => {
    switch (data.type) {
      case 'PLAYER_JOIN':
        console.log(`${data.name} enter the game`)
        break
      default:
        break
    }
  })

  socket.on('game', (data) => {
    switch (data.type) {
    case 'BOARD_UPDATE':
      store.dispatch(getMap(data.payload))
      break
    default:
      console.log(`Unexpected action ${data.type}`)
      break
    }
  })
}

const redTetrisMiddleware = (socket) => ((store) => (next) => (action) => {
  switch (action.type) {
  case 'REQ_REFRESH_ROOMS':
    socket.emit('lobby', { type: action.type })
    break
  case 'REQ_CREATE_ROOM':
    socket.emit('lobby', { type: action.type, name: store.getState().lobby.createRoomName })
  default:
    break
  }
  return next(action)
})

export default redTetrisMiddleware
