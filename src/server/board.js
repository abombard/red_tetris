const Piece = require('./piece')

const copyArray = (arr) => (
  JSON.parse(JSON.stringify(arr))
)

const placePiece = (x0, y0, grid, piece) => {
  let newGrid = copyArray(grid)

  for (let x = 0; x < piece.length; x++) {
    for (let y = 0; y < piece[0].length; y++) {
      if ((x + x0 >= newGrid.length || x + x0 < 0 || y + y0 < 0 || y + y0 >= newGrid[0].length) ||
          (piece[x][y] === 1 && newGrid[x + x0][y + y0] === 1)) {
        console.log('returning null');
        return null; 
      }
      else if (piece[x][y] === 1) {
        newGrid[x0 + x][y0 + y] = 1;
      }
    }
  }
  return newGrid;
}

const deleteLine = (grid, yline) => {
  for (let y = yline; y > 1; y--) {
    for (let x = 0; x < grid.length; x++) {
      grid[x][y] = grid[x][y-1]
    }
  }
  return grid
}
  
const checkIfFull = (grid) => {

    let fullline = true;
    for (let y = 0; y < grid[0].length; y++) {
      for (let x = 0; x < grid.length; x++) {
        if (grid[x][y] === 0)
          fullline = false
      }
      if (fullline === true)
      {
        console.log('FOUND A FULL LINE')
        grid = deleteLine(grid, y);
      }
      else
        fullline = true;
    }
    return grid
  }

const RIGHT = 37
const LEFT = 39
const UP = 38
const DOWN = 40
const SPACE = 32

const Board = function() {
  this.grid = new Array(10).fill(new Array(15).fill(0))
  this.piece = new Piece(this.grid.length / 2, 0)
  this.displayGrid = placePiece(
    this.piece.x,
    this.piece.y,
    this.grid,
    this.piece.piece
  );
  if (this.displayGrid !== null) {
    console.log("first piece placed successfully");
  }
  this.update = null

  this.rotatePiece = () => {
    this.piece.rotate()
    const newGrid = placePiece(
      this.piece.x,
      this.piece.y,
      this.grid,
      this.piece.piece
    )
    if (newGrid !== null) {
      this.displayGrid = newGrid
    }
    else {
      this.piece.revRotate()
    }
  }

  this.move = (x, y) => {

    const update = this.update
    this.update = null

    if (update !== null) {
      switch (update) {
        case LEFT:
          this.move(1, 0)
          break
        case RIGHT:
          this.move(-1, 0)
          break
        case DOWN:
          this.move(0, 1)
          break
        case UP:
        case SPACE:
          this.rotatePiece()
          break
      }
    }

    const newdisplayGrid = placePiece(
      this.piece.x + x,
      this.piece.y + y,
      this.grid,
      this.piece.piece
    )
    if (newdisplayGrid !== null) {
      console.log("piece placed successfully")
      this.displayGrid = newdisplayGrid
      this.piece.y += y
      this.piece.x += x
    }
    else if (y > 0) {
      console.log('cant go down anymore')
      this.piece = new Piece(this.grid.length / 2, 0)
      this.grid = copyArray(this.displayGrid)
      this.displayGrid = placePiece(
        this.piece.x,
        this.piece.y,
        this.grid,
        this.piece.piece
      )
    }
    this.grid = checkIfFull(this.grid) 
  }

}

module.exports = Board;
