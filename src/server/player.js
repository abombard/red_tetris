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

  this.socket.emit('action', { type : 'board', payload : this.board.displayGrid }) 

  this.socket.on('action', (action) => {
    switch (action.type) {
    case 'KEY_PRESS':
      this.board.update = action.payload;
      break ;
    default:
      console.log(`Unexpected action ${action.type}`)
      break ;
    }
  })

  this.loopCount = 0

  this.loop = () => {
    this.loopID = setInterval(() => {    //  call a 3s setTimeout when the loop is called
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

      if (this.loopCount == 2) {
        this.board.move(0, 1); 
        this.loopCount = 0
      }

      //console.log(this.board.displayGrid)
      this.socket.emit('action', { type : 'board', payload : this.board.displayGrid })
    }, 250)
  }

}

module.exports = Player;
