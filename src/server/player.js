var Board = require('./board')

var Player = function(id, name) {
  this.id = id
  this.name = name
  this.board = new Board()
}

module.exports = Player;
