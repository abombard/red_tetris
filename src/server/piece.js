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
      [2,0,0],
      [2,2,2],
      [0,0,0]
    ],
    [
      [0,2,2],
      [0,2,0],
      [0,2,0]
    ],
    [
      [0,0,0],
      [2,2,2],
      [0,0,2]
    ],
    [
      [0,2,0],
      [0,2,0],
      [2,2,0]
    ],
  ],
// S
  [
    [
      [0,3,3],
      [3,3,0],
      [0,0,0]
    ],
    [
      [0,3,0],
      [0,3,3],
      [0,0,3]
    ],
    [
      [0,0,0],
      [0,3,3],
      [3,3,0]
    ],
    [
      [3,0,0],
      [3,3,0],
      [0,3,0]
    ],
  ],
// Z
  [
    [
      [4,4,0],
      [0,4,4],
      [0,0,0]
    ],
    [
      [0,0,4],
      [0,4,4],
      [0,4,0]
    ],
    [
      [0,0,0],
      [4,4,0],
      [0,4,4]
    ],
    [
      [0,4,0],
      [4,4,0],
      [4,0,0]
    ],
  ],
// T
  [
    [
      [0,5,0],
      [5,5,5],
      [0,0,0]
    ],
    [
      [0,5,0],
      [0,5,5],
      [0,5,0]
    ],
    [
      [0,0,0],
      [5,5,5],
      [0,5,0]
    ],
    [
      [0,5,0],
      [5,5,0],
      [0,5,0]
    ],
  ],
// I
  [
    [
      [0,0,0,0],
      [6,6,6,6],
      [0,0,0,0],
      [0,0,0,0]
    ],
    [
      [0,0,6,0],
      [0,0,6,0],
      [0,0,6,0],
      [0,0,6,0]
    ],
    [
      [0,0,0,0],
      [0,0,0,0],
      [6,6,6,6],
      [0,0,0,0]
    ],
    [
      [0,6,0,0],
      [0,6,0,0],
      [0,6,0,0],
      [0,6,0,0]
    ],
  ],
// O
  [
    [
      [7,7],
      [7,7]
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
