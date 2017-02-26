var Board = require('./board')

const RIGHT = 37
const LEFT = 39
const UP = 38
const DOWN = 40
const SPACE = 32

var Player = function(socket, name) {
  this.socket = socket
  this.name = name
  this.board = new Board()

  this.socket.emit('game', {
    type : 'BOARD_UPDATE',
    payload :
    {
      displayGrid: this.board.displayGrid,
      nextPiece: this.board.nextPieceGrid,
      shadow: this.board.shadow
    }
  })

  this.socket.on('game', (data) => {
    switch (data.type) {
    case 'KEY_PRESS':
      this.board.update = data.payload;
      break ;
    default:
      console.log(`Unexpected action ${action.type}`)
      break ;
    }
  })

  this.loop = () => {

    this.dropSpeed = 500
    let dropDownCallback = () => {
      setTimeout(() => {
        this.board.move(0, 1);
        dropDownCallback()
      }, this.dropSpeed)
    }
    dropDownCallback()

    let previousBoard = this.board.displayGrid
    this.loopID = setInterval(() => {
      this.loopCount ++

      if (this.board.update !== null) {

        const update = this.board.update
        this.board.update = null

        if (update !== null) {
          switch (update) {
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
        }
      }

      //console.log(this.board.displayGrid)
      if (this.board.displayGrid != previousBoard) {
        console.log('different board, need update')
        this.socket.emit('game', {
          type : 'BOARD_UPDATE',
          payload : {
            displayGrid: this.board.displayGrid,
            nextPiece: this.board.nextPieceGrid,
            shadow: this.board.shadow
          }
        })
      }
      previousBoard = this.board.displayGrid
    }, 16) // 60 tickrate (should be enough for tetris kek)
  }

}

module.exports = Player;
