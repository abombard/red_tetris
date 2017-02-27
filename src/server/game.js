import debug from 'debug'

const loginfo = debug('tetris:info')

let Player = require('./player')
let Board = require('./board')
let Piece = require('./piece')
let Room = require('./room')

let rooms = []
let players = {}

export const handle = (io) => {
  io.on('connection', (socket) => {
    loginfo(`Socket connected: ${socket.id}`)

    const player = new Player(socket, 'anonymous')
    players[socket.id] = player

    socket.on('lobby', (data) => {
      switch (data.type) {
        case 'REQ_REFRESH_ROOMS':
          socket.emit('lobby', {
            type : 'REFRESH_ROOMS',
            rooms : (() => {
              let rawRooms = []
              for (let key in rooms) {
                rawRooms.push(rooms[key].toRawData())
              }
              return rawRooms
            })()
          })
          break
        case 'REQ_CREATE_ROOM':
          let success = data.name.length != 0
          for (let key in rooms) {
            if (rooms[key].name === data.name) {
              success = false
              break
            }
          }
          socket.emit('lobby', {
            type: 'RESP_CREATE_ROOM',
            response: success,
            name: data.name,
          })
        default:
          break
      }
    })

    socket.on('room', (data) => {
      switch (data.type) {
        case 'JOIN_ROOM':
          player.name = data.playerName
          if (player.room) {
            socket.emit('room', {
              type: 'JOIN_ROOM_FAIL',
              reason: 'player already in a room',
            })
            return
          }
          if (data.roomName.length === 0) {
            socket.emit('room', {
              type: 'JOIN_ROOM_FAIL',
              reason: 'invalid room name',
            })
            return
          }

          if (!rooms[data.roomName]) {
            rooms[data.roomName] = new Room(data.roomName)
          }

          let room = rooms[data.roomName]
          if (room.players.length < room.maxPlayer) {
            socket.join(room.name)
            io.to(room.name).emit('room', {
              type: 'PLAYER_JOIN',
              name: player.name,
            })
            room.join(player)
            player.room = room
            player.startGame()
          }
          else {
            socket.emit('room', {
              type: 'JOIN_ROOM_FAIL',
              reason: 'the room is full',
            })
          }
          break
        case 'LEAVE_ROOM':
          if (player.room) {
            io.to(player.room.name).emit('room', {
              type: 'PLAYER_LEAVE',
              name: player.name,
            })
            socket.leave(player.room.name)
            player.endGame()
            player.room.leave(player)
            if (player.room.players.length === 0) {
              delete rooms[player.room.name]
            }
            player.room = null
          }
        default:
          break
      }
    })

    socket.on('disconnect', () => {
      player.endGame()
      if (player.room) {
        io.to(player.room.name).emit('room', {
          type: 'PLAYER_LEAVE',
          name: player.name,
        })
        player.room.leave(player)
        if (player.room.players.length === 0) {
          delete rooms[player.room.name]
        }
      }
      delete players[socket.id]
    })

  })
}
