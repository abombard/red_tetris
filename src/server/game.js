import debug from 'debug'

const loginfo = debug('tetris:info')

let rooms = []

export const handle = (io) => {
  io.on('connection', (socket) => {
    loginfo(`Socket connected: ${socket.id}`)

    socket.on('lobby', (data) => {
      loginfo(data.type)
      switch (data.type) {
        case 'REQ_REFRESH_ROOMS':
          rooms.push({
            name: 'room ' + rooms.length,
            playerCount : 0
          })
          socket.emit('lobby', { type : 'REFRESH_ROOMS', rooms })
        default:
          break
      }
    })

  })
}
