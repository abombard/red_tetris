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
    if (this.players.length == this.maxPlayer) {
      this.startGame()
    }
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

  this.sendAll = (src, type, data) => {
    this.players.map((dst) => {
      if (dst !== src) {
        dst.socket.emit(type, data)
      }
    })
  }

  this.startGame = () => {
    console.log('Starting Game')
    this.players[0].inGame = true
    this.players[1].inGame = true

    for (let i = 0; i < 500; i ++) {
      this.pieces.push(new Piece(5, 0)) // i know i know
    }

    this.players.map((player) => {
      player.initGame(this.pieces)
    })

    this.loopCount = 0
    this.gameLoop = () => {
      this.players.map((player) => {
        if (this.loopCount == 32) { // 500 / 16 = 32
          player.board.move(0, 1)
        }

        const fullLineCount = player.board.checkFullLine()
        if (fullLineCount > 0) {
          console.log(`Found ${fullLineCount} full lines`)
          this.allPlayerBut(player, (enemy) => {
            console.log('adding line to enemy')
            enemy.board.addLine(fullLineCount)
          })
        }

        if (player.board.gameOver) {
          player.socket.emit('game', { type: 'BOARD_UPDATE', payload: { win: -1 } }) // this is not really used
          this.allPlayerBut(player, (enemy) => {
            enemy.socket.emit('game', { type: 'BOARD_UPDATE', payload: { win: 1 } })
          })
          this.endGame()
        }
        else
          player.updateScreen()
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
    if (this.players[0].inGame == false && this.players[1].inGame == false)
    {
      this.players.map((player) => {
        player.initGame(this.pieces)
      })
      this.startGame()
    }
  }

}

module.exports = Room
