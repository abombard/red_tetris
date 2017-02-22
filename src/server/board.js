const Piece = require('./piece')

const copyArray = (arr) => (
  JSON.parse(JSON.stringify(arr))
)

const placePiece = (x0, y0, grid, piece) => {
  let newGrid = copyArray(grid)

  for (let x = 0; x < piece.length; x++) {
    for (let y = 0; y < piece[0].length; y++) {
      if ((x + x0 >= newGrid.length || x + x0 < 0 || y + y0 < 0 || y + y0 >= newGrid[0].length) ||
        (piece[x][y] !== 0 && newGrid[x + x0][y + y0] !== 0)) {
        console.log('returning null');
        return null; 
      }
      else if (piece[x][y] !== 0) {
        newGrid[x0 + x][y0 + y] = piece[x][y];
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
      grid = deleteLine(grid, y);
    else
      fullline = true;
  }
  return grid
}

const emptyGrid = () => (
  new Array(10).fill(new Array(20).fill(0))
)

const Board = function() {
  this.grid = emptyGrid()
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
      if (this.displayGrid === null) {
        this.grid = emptyGrid()
        this.displayGridgrid = emptyGrid()
        this.piece = new Piece(this.grid.length / 2, 0)
      }
    }
    this.grid = checkIfFull(this.grid) 
  }

}

module.exports = Board;
