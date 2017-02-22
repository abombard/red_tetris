var Piece = require('./piece')


function placePiece(xorigpiece, yorigpiece, grid, piece) {
  for (var xpiece = 0; xpiece < piece.length; xpiece++)
  {
    for (var ypiece = 0; ypiece < piece[0].length; ypiece++)
    {
      if ((xpiece + xorigpiece >= grid.length || ypiece + yorigpiece >= grid[0].length) || (piece[xpiece][ypiece] === 1 && grid[xpiece + xorigpiece][ypiece + yorigpiece] === 1))
      {
        console.log('returning null');
        return null; 
      }
      else if (piece[xpiece][ypiece] === 1) 
      {
        console.log('OKAYYYY');
        grid[xorigpiece + xpiece][yorigpiece + ypiece] = 1;
      }
    }
  }
  return grid;
}

function initBoard() {
  var arr = new Array(10)
    for (var i = 0; i < arr.length; i++) {
      arr[i] = new Array(15);
      arr[i].fill(0);
    }
  return arr
}


var Board = function() {
  this.grid = initBoard();
  this.piece = new Piece(this.grid.length/2, 0);
  this.dispgrid = placePiece(this.piece.x, this.piece.y,  JSON.parse(JSON.stringify(this.grid)) , this.piece.piece);
  if (this.dispgrid !== null)
  {
    console.log("first piece placed successfully");
  }





  this.moveDown = function() {
    this.newdispgrid = placePiece(this.piece.x, this.piece.y + 1, JSON.parse(JSON.stringify(this.grid)), this.piece.piece);
    if (this.newdispgrid !== null)
    {
      this.dispgrid = JSON.parse(JSON.stringify(this.newdispgrid));
      console.log("piece placed successfully");
      this.piece.y += 1;
    }
    else
    {
      console.log('cant go down anymore')
      this.piece = new Piece(this.grid.length/2, 0);
      this.grid = JSON.parse(JSON.stringify(this.dispgrid))
      this.dispgrid = placePiece(this.piece.x, this.piece.y, JSON.parse(JSON.stringify(this.grid)), this.piece.piece);
    }
  }
  this.rot = function() {
    this.piece.rotate();
  }
}

module.exports = Board;
