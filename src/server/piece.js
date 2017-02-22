const figures = [
// L
  [
    [
      [0,0,1],
      [1,1,1],
    ],
    [
      [1,0],
      [1,0],
      [1,1]
    ],
    [
      [1,1,1],
      [1,0,0]
    ],
    [
      [1,1],
      [0,1],
      [0,1]
    ],
  ],
// inverted L
  [
    [
      [1,0,0],
      [1,1,1],
    ],
    [
      [1,1],
      [1,0],
      [1,0]
    ],
    [
      [1,1,1],
      [0,0,1]
    ],
    [
      [0,1],
      [0,1],
      [1,1]
    ],
  ],
// S
  [
    [
      [0,1,1],
      [1,1,0],
    ],
    [
      [1,0],
      [1,1],
      [0,1]
    ],
    [
      [0,1,1],
      [1,1,0]
    ],
    [
      [1,0],
      [1,1],
      [0,1]
    ],
  ],
// Z
  [
    [
      [1,1,0],
      [0,1,1],
    ],
    [
      [0,1],
      [1,1],
      [1,0]
    ],
    [
      [1,1,0],
      [0,1,1]
    ],
    [
      [0,1],
      [1,1],
      [1,0]
    ],
  ],
// T
  [
    [
      [0,1,0],
      [1,1,1],
    ],
    [
      [1,0],
      [1,1],
      [1,0]
    ],
    [
      [1,1,1],
      [0,1,0]
    ],
    [
      [0,1],
      [1,1],
      [0,1]
    ],
  ],
// I
  [
    [
      [1,1,1,1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
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
  return Math.floor(Math.random() * 7);
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
}

module.exports = Piece;
