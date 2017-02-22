const figures = [
// L
  [
    [
      [0,1,0],
      [0,1,0],
      [1,1,0]
    ],
    [
      [0,0,0],
      [1,0,0],
      [1,1,1]
    ],
    [
      [0,1,1],
      [0,1,0],
      [0,1,0]
    ],
    [
      [0,0,0],
      [1,1,1],
      [0,0,1]
    ],
  ],
// S
  [
    [
      [1,1,0],
      [0,1,1],
      [0,0,0]
    ],
    [
      [0,1,0],
      [1,1,0],
      [1,0,0]
    ],
  ],
// T
  [
    [
      [0,1,0],
      [1,1,1],
      [0,0,0]
    ],
    [
      [0,1,0],
      [0,1,1],
      [0,1,0]
    ],
    [
      [0,0,0],
      [1,1,1],
      [0,1,0]
    ],
    [
      [0,1,0],
      [1,1,0],
      [0,1,0]
    ],
  ],
// I
  [
    [
      [0,0,0,0],
      [1,1,1,1],
      [0,0,0,0],
      [0,0,0,0]
    ],
    [
      [0,0,1,0],
      [0,0,1,0],
      [0,0,1,0],
      [0,0,1,0]
    ],
  ],
// O
  [
    [
      [1,1],
      [1,1]
    ],
  ],
]

const getRandomPieceId = () => {
  return Math.floor(Math.random() * 5);
}

var Piece = function(x, y)  {
  this.x = x
  this.y = y
  this.id = getRandomPieceId()
  this.rot = 0
  this.piece = figures[this.id][this.rot]
  this.rotate = () => {
    this.rot = figures[this.id][this.rot + 1] === undefined ? 0 : this.rot + 1
    this.piece = figures[this.id][this.rot]
  }
  this.update = null
}

module.exports = Piece;
