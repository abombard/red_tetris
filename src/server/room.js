var Room = function(name) {
  this.maxPlayer = 4
  this.name = name
  this.ownerID = null
  this.players = []

  this.join = (player) => {
    let success = this.players.length < this.maxPlayer
    if (success) {
      this.players.push(player)
      if (this.ownerID === null) {
        this.ownerID = player.socket.id
      }
    }
    return success
  }

  this.leave = (player) => {
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
}

module.exports = Room
