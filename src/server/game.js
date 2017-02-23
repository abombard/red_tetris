import debug from 'debug'

const loginfo = debug('tetris:info')

let Player = require('./player');
let Board = require('./board');
let Piece = require('./piece');

let rooms = []
let players = {}

export const handle = (io) => {
  io.on('connection', (socket) => {
    loginfo(`Socket connected: ${socket.id}`)

    socket.on('lobby', (data) => {
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

    socket.on('room', (data) => {
      switch (data.type) {
        case 'JOIN_ROOM':
          const player = new Player(socket, data.name)
          player.loop()
          players[socket.id] = player
          break
        case 'LEAVE_ROOM':
          if (players[socket.id]) {
            clearInterval(players[socket.id].loopID)
            delete players[socket.id]
          }
        default:
          break
      }
    })

    socket.on('disconnect', () => {
      if (players[socket.id]) {
        clearInterval(players[socket.id].loopID)
        delete players[socket.id]
      }
    })

  })
}
