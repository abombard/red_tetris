var Board = require('./board')

const RIGHT = 37
const LEFT = 39
const UP = 38
const DOWN = 40
const SPACE = 32

var Player = function(socket, name) {
  this.socket = socket
  this.name = name
  this.board = null
  this.screenGrid = null
  this.room = null
  this.inGame = false

  this.updateScreen = () => {

    if (this.screenGrid == this.board.displayGrid) {
      return
    }

    let shadow = this.board.shadow
    for (let i = 0; i < this.room.players.length; i++) {
      if (this.room.players[i].socket != this.socket) {
        shadow = this.room.players[i].board.shadow;
      }
    }

    this.socket.emit('game', {
      type: 'BOARD_UPDATE',
      payload: {
        displayGrid: this.board.displayGrid,
        nextPiece: this.board.nextPieceGrid,
        shadow: shadow,
      },
    })

    this.screenGrid = this.board.displayGrid
  }

  this.socket.on('game', (data) => {

    switch (data.type) {
      case 'KEY_PRESS':
        const input = data.payload;

        switch (input) {
          case LEFT:
            this.board.move(1, 0)
            break
          case RIGHT:
            this.board.move(-1, 0)
            break
          case DOWN:
            this.board.move(0, 1)
            break
          case UP:
          case SPACE:
            this.board.rotatePiece()
            break
        }

        break ;
      default:
        console.log(`Unexpected action KEY_PRESS ${action.type}`)
        break ;
    }

  })

  this.initGame = (pieces) => {
    this.board = new Board(pieces)
    this.screenGrid = this.board.displayGrid
  }

  this.endGame = () => {
    this.board = null
  }

  this.toRawData = () => ({
    name: this.name,
  })

}

module.exports = Player;
