var Piece = require('./piece')


function placePiece(xorigpiece, yorigpiece, grid, piece) {
  for (var xpiece = 0; xpiece < piece.length; xpiece++)
  {
    for (var ypiece = 0; ypiece < piece[0].length; ypiece++)
    {
      if (piece[xpiece][ypiece] === 1 && grid[xpiece + xorigpiece][ypiece + yorigpiece] === 1)
      {
        console.log('returning null')
          return null; 
      }
      else if (piece[xpiece][ypiece] === 1) 
      {
        console.log('OKAYYYY')
          grid[xpiece + grid.length / 2][ypiece] = 1;
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
  var tmpArr = placePiece(this.piece.x, this.piece.y, this.grid.slice(), this.piece.piece);
  if (tmpArr !== null)
  {
    console.log("first piece placed successfully");
    this.grid = tmpArr;
  }


  this.moveDown = function() {
    var tmpArr = placePiece(this.piece.x, this.piece.y + 1, this.grid.slice(), this.piece.piece);
    if (tmpArr !== null)
    {
      console.log("first piece placed successfully");
      this.grid = tmpArr;
      this.piece.y += 1;
    }
    else
    {
      this.piece = new Piece(this.grid.length/2, 0);
    }
  }

}

module.exports = Board;
