// 1 -> blue
// 2 -> green
// 3 -> red
// 4 -> yellow

const figures = [
// L
  [
    [
      [0,0,1],
      [1,1,1],
      [0,0,0]
    ],
    [
      [0,1,0],
      [0,1,0],
      [0,1,1]
    ],
    [
      [0,0,0],
      [1,1,1],
      [1,0,0]
    ],
    [
      [1,1,0],
      [0,1,0],
      [0,1,0]
    ],
  ],
// inverted L
  [
    [
      [1,0,0],
      [1,1,1],
      [0,0,0]
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
    [
      [0,1,0],
      [0,1,0],
      [1,1,0]
    ],
  ],
// S
  [
    [
      [0,1,1],
      [1,1,0],
      [0,0,0]
    ],
    [
      [0,1,0],
      [0,1,1],
      [0,0,1]
    ],
    [
      [0,0,0],
      [0,1,1],
      [1,1,0]
    ],
    [
      [1,0,0],
      [1,1,0],
      [0,1,0]
    ],
  ],
// Z
  [
    [
      [1,1,0],
      [0,1,1],
      [0,0,0]
    ],
    [
      [0,0,1],
      [0,1,1],
      [0,1,0]
    ],
    [
      [0,0,0],
      [1,1,0],
      [0,1,1]
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
    [
      [0,0,0,0],
      [0,0,0,0],
      [1,1,1,1],
      [0,0,0,0]
    ],
    [
      [0,1,0,0],
      [0,1,0,0],
      [0,1,0,0],
      [0,1,0,0]
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

  this.revRotate = () => {
    this.rot = figures[this.id][this.rot - 1] === undefined ?
      figures[this.id].length - 1 : this.rot - 1
    this.piece = figures[this.id][this.rot]
  }

  this.clone = () => {
    let c = new Piece(this.x, this.y)
    c.id = this.id
    c.rot = this.rot
    c.piece = this.piece
    return c
  }
}

module.exports = Piece;
