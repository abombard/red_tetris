import Piece from './piece'

var Room = function(name) {
  this.maxPlayer = 2
  this.name = name
  this.ownerID = null
  this.players = []

  this.pieces = []

  this.join = (player) => {
    let success = this.players.length < this.maxPlayer
    if (success) {
      this.players.push(player)
      if (this.ownerID === null) {
        this.ownerID = player.socket.id
      }
    }
    if (this.players.length == this.maxPlayer && this.players[0].inGame === false) {
      this.startGame()
    }
    else if (this.players.length === 1)
      this.startGame()
    return success
  }

  this.leave = (player) => {
    this.endGame()
    let index = this.players.indexOf(player)
    if (index != -1) {
      this.players.splice(index, 1)
      if (this.players.length === 0) {
        return
      }
      if (player.socket.id === this.ownerID) {
        if (this.players.length > 0) {
          this.ownerID = this.players[0].socket.id
        }
        else {
          this.ownerID = null
        }
      }
      this.restart()
    }
  }

  this.toRawData = () => ({
    maxPlayer: this.maxPlayer,
    name: this.name,
    ownerID: this.ownerID,
    playerCount: this.players.length,
    players: (() => {
      let rawPlayers = []
      for (let key in this.players) {
        rawPlayers.push(this.players[key].toRawData())
      }
      return rawPlayers
    })()
  })

  this.allPlayerBut = (src, cb) => {
    this.players.map((player) => {
      if (player !== src) {
        cb(player)
      }
    })
  }

  this.startGame = () => {
    console.log('Starting Game')
    this.players.map((player) => {
      player.inGame = true
    })

    this.pieces = []
    for (let i = 0; i < 500; i ++) {
      this.pieces.push(new Piece(5, 0)) // i know i know
    }

    this.players.map((player) => {
      player.initGame(this.pieces)
    })

    this.loopCount = 0
    this.gameLoop = () => {
      this.players.map((player) => {
        if (player.inGame === true) {
          if (this.loopCount == 32) { // 500 / 16 = 32
            player.board.move(0, 1)
          }

          const fullLineCount = player.board.checkFullLine()
          if (fullLineCount > 0) {
            console.log(`Found ${fullLineCount} full lines`)
            this.allPlayerBut(player, (enemy) => {
              console.log('adding line to enemy')
	      if (enemy.board !== null) {
              enemy.board.addLine(fullLineCount)
}
            })
          }

          if (player.board.gameOver) {
            player.lost = 1
            player.socket.emit('game', { type: 'BOARD_UPDATE', payload: { win: -1 } }) // this is not really used
            this.allPlayerBut(player, (enemy) => {
              enemy.lost = -1
              if (enemy.inGame === true)
              enemy.socket.emit('game', { type: 'BOARD_UPDATE', payload: { win: 1 } })
            })
            this.endGame()
          }
          else
            player.updateScreen()

        }
        else if (player.lost === 0) {
            player.socket.emit('game', { type: 'BOARD_UPDATE', payload: { win: -2 } }) 
        }
      })
      this.loopCount = this.loopCount == 32 ? 0 : this.loopCount + 1
    }

    this.loopID = setInterval(this.gameLoop, 16 )
  }

  this.endGame = () => {
    console.log('End Game')
    clearInterval(this.loopID)
    this.players.map((player) => {
      player.inGame = false
    })
  }

  this.restart = () => {
    let ig = false
    this.players.map((player) => {
      if (player.inGame === true)
        ig = true
    })
    if (ig === false) {
      this.startGame()
    }
  }

}

module.exports = Room
