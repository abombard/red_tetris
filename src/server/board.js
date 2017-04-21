const Piece = require('./piece')

const copyArray = (arr) => (
  JSON.parse(JSON.stringify(arr))
)

const emptyGrid = () => {
  var x = new Array(10);
  for (var i = 0; i < 10; i++) {
      x[i] = new Array(20).fill(0);
  }
  return x
}


const getMaxPiece  = (piece) => {
  let xmax = 0
  let ymax = 0
  let xmin = 4
  let ymin = 4

  for (let x = 0; x < piece.length; x++) {
    for (let y = 0; y < piece[0].length; y++) {
      if (piece[x][y] !== 0 && y > ymax)
        ymax = y
      if (piece[x][y] !== 0 && y < ymin)
        ymin = y
      if (piece[x][y] !== 0 && x > xmax)
        xmax = x
      if (piece[x][y] !== 0 && x < xmin)
        xmin = x
    }
  }
  return {xmax: xmax, ymax: ymax, xmin: xmin, ymin: ymin}
}

const placePiece = (x0, y0, grid, piece) => {
  let newGrid = copyArray(grid)
  let minmax = getMaxPiece(piece)

      if (x0 + minmax.xmax >= newGrid.length || x0 + minmax.xmin < 0 || y0 + minmax.ymin < 0 || y0 + minmax.ymax >= newGrid[0].length)
  {
    return null
  }

  for (let x = 0; x < piece.length; x++) {
    for (let y = 0; y < piece[0].length; y++) {
      if (piece[x][y] !== 0 && newGrid[x + x0][y + y0] !== 0) {
        return null;
      }
      else if (piece[x][y] !== 0) {
        newGrid[x0 + x][y0 + y] = piece[x][y];
      }
    }
  }
  return newGrid;
}

const forcePlacePiece = (x0, y0, grid, piece) => {
  let newGrid = copyArray(grid)
  let minmax = getMaxPiece(piece)

      if (x0 + minmax.xmax >= newGrid.length || x0 + minmax.xmin < 0 || y0 + minmax.ymin < 0 || y0 + minmax.ymax >= newGrid[0].length)
  {
    return null
  }

  for (let x = 0; x < piece.length; x++) {
    for (let y = 0; y < piece[0].length; y++) {
      if (piece[x][y] !== 0 && newGrid[x + x0][y + y0] !== 0) {
        return forcePlacePiece (x0, y0 - 1, grid, piece)
      }
      else if (piece[x][y] !== 0) {
        newGrid[x0 + x][y0 + y] = piece[x][y];
      }
    }
  }
  return newGrid;
}

const emptyPiece = () => (
  new Array(4).fill(new Array(4).fill(0))
)

// Créer la petite grille de 4x4 remplie par la next piece centrée
const displayNextPiece = (nextPiece) => {
  let nextPieceGrid = copyArray(emptyPiece())
  let vert_offset = parseInt((5 - nextPiece.length) / 2)
  let hor_offset = parseInt((4 - nextPiece[0].length) / 2)
  for (let y = vert_offset, yp = 0; yp < nextPiece.length; y++, yp++) {
    for (let x = hor_offset, xp = 0; xp < nextPiece[0].length; x++, xp++) {
      nextPieceGrid[y][x] = nextPiece[yp][xp];
    }
  }
  return nextPieceGrid;
}

const createShadow = (grid) => {
  let shadow = copyArray(emptyGrid())
  for (let y = 0; y < 10; y++) {
    let x = 0
    while (grid[y][x] == 0 && x < 20) {
      x++;
    }
    while (x < 20) {
      shadow[y][x] = 8;
      x++;
    }
  }
  return (shadow)
}

const Board = function(roomPieceList) {
  if (!roomPieceList) {
    console.log('Error: Initialize Board without roomPieceList')
  }

  this.grid = null

  this.roomPieceList = roomPieceList
  this.pieceCount = 0

  this.piece = null
  this.nextPiece = null

  this.nextPieceGrid = null
  this.displayGrid = null

  this.shadow = null

  this.gameOver = false

  this.setupDisplay = () => {
    this.displayGrid = placePiece(
      this.piece.x,
      this.piece.y,
      this.grid,
      this.piece.piece
    )
    this.nextPieceGrid = displayNextPiece(this.nextPiece.piece)
    this.shadow = createShadow(this.grid)
  }

  this.init = () => {
    this.grid = emptyGrid()
    this.piece = this.roomPieceList[0].clone()
    this.nextPiece = this.roomPieceList[1].clone()
    this.pieceCount = 2
    this.setupDisplay()
  }

  this.init()

  this.getNextPiece = () => {
    this.piece = this.nextPiece
    this.nextPiece = this.roomPieceList[this.pieceCount].clone()
    this.pieceCount ++
  }

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

  this.move = (x, y, down) => {
    let newdisplayGrid
    if (down) {
      newdisplayGrid = placePiece(
        this.piece.x,
        this.piece.y + 1,
        this.grid,
        this.piece.piece
      )
      while (newdisplayGrid !== null)
      {
        this.displayGrid = newdisplayGrid
        newdisplayGrid = placePiece(
          this.piece.x,
          this.piece.y + 1,
          this.grid,
          this.piece.piece
        )
        this.piece.y += 1
      }
    }
    else {
      newdisplayGrid = placePiece(
        this.piece.x + x,
        this.piece.y + y,
        this.grid,
        this.piece.piece
      )
    }
    if (newdisplayGrid !== null) {
      this.displayGrid = newdisplayGrid
      this.piece.y += y
      this.piece.x += x
    }
    else if (y > 0) {
      this.grid = copyArray(this.displayGrid)
      this.getNextPiece()
      this.setupDisplay()
      if (this.displayGrid === null) {
        this.gameOver = true
        this.init()
      }
    }

  }

  this.deleteLine = (yline) => {
    for (let y = yline; y > 1; y--) {
      for (let x = 0; x < this.grid.length; x++) {
        this.grid[x][y] = this.grid[x][y-1]
      }
    }
  }

  this.checkFullLine = () => {
    let fullLineCount = 0

    for (let y = 0; y < this.grid[0].length; y++) {
      let fullLine = true;

      for (let x = 0; x < this.grid.length; x++) {
        if (this.grid[x][y] === 0 || this.grid[x][y] == 42) {
          fullLine = false
          break
        }
      }
      if (fullLine === true) {
        fullLineCount += 1
        this.deleteLine(y);
      }
    }

    return fullLineCount
  }

  this.addLine = (lineCount) => {
    let intAddLine = (grid) => {
    	let newGrid = emptyGrid()

	for (let y = lineCount; y < grid[0].length; y ++) {
	  for (let x = 0; x < grid.length; x ++) {
	    newGrid[x][y - lineCount] = grid[x][y]
	  }
	}

	for (let y = grid[0].length - lineCount; y < grid[0].length; y ++) {
	  for (let x = 0; x < grid.length; x ++) {
	    newGrid[x][y] = 42
	  }
	}
	
	return newGrid
    }

    this.grid = intAddLine (this.grid)
	this.displayGrid = forcePlacePiece(
        this.piece.x,
        this.piece.y,
        this.grid,
        this.piece.piece
      )
      if (this.displayGrid === null) {
        this.gameOver = true
        this.init()
      }
  }

}

module.exports = Board;
