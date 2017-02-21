import * as actions from '../actions'

export const listen = (store, socket) => {
  socket.on('lobby', (data) => {
    switch (data.type) {
    case 'REFRESH_ROOMS':
      store.dispatch(actions.refreshRooms(data.rooms))
      break
    default:
      break
    }
  })
}

const redTetrisMiddleware = (socket) => ((store) => (next) => (action) => {
  switch (action.type) {
  case 'REQ_REFRESH_ROOMS':
    socket.emit('lobby', { type: action.type })
    break
  default:
    break
  }
  return next(action)
})

export default redTetrisMiddleware
