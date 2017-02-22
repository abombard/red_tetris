const Piece = require('./piece')

const copyArray = (arr) => (
  JSON.parse(JSON.stringify(arr))
)

const placePiece = (x0, y0, grid, piece) => {
  let newGrid = copyArray(grid)

  for (let x = 0; x < piece.length; x++) {
    for (let y = 0; y < piece[0].length; y++) {
      if ((x + x0 >= newGrid.length || y + y0 >= newGrid[0].length) ||
          (piece[x][y] === 1 && newGrid[x + x0][y + y0] === 1)) {
        console.log('returning null');
        return null; 
      }
      else if (piece[x][y] === 1) {
        console.log('OKAYYYY');
        newGrid[x0 + x][y0 + y] = 1;
      }
    }
  }
  return newGrid;
}

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

  this.moveDown = () => {
    if (this.piece.update !== null) {
      this.piece.rotate()
      this.piece.update = null
    }
    const newdisplayGrid = placePiece(
        this.piece.x,
        this.piece.y + 1,
        this.grid,
        this.piece.piece
    )
    if (newdisplayGrid !== null) {
      console.log("piece placed successfully")
      this.displayGrid = newdisplayGrid
      this.piece.y += 1
    }
    else {
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
  }
}

module.exports = Board;
