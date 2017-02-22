var Piece = function(x, y)  {
  this.x = x;
  this.y = y;
  var figures = [];
  figures["L"] = [
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
  ];
  figures["Z"] = [
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
  ];
  figures["T"] = [
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
  ];
  figures["I"] = [
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
  ];
  figures["O"] = [
    [
      [1,1],
      [1,1]
    ]
  ];
  var rand = Math.floor(Math.random() * 5) + 1;
  switch (rand) {
    case 1:
      this.id = "L";
      break;
    case 2:
      this.id = "Z"
      break;
    case 3:
      this.id = "T"
      break;
    case 4:
      this.id = "I"
      break;
    case 5:
      this.id = "O"
  }
      this.rot = 0;
      this.piece = figures[this.id][this.rot];

  this.rotate = function() {
    if (figures[this.id][this.rot + 1] === undefined)
    {
      this.rot = 0;
      this.piece = figures[this.id][this.rot]
    }
    else
    {
      this.rot += 1;
      this.piece = figures[this.id][this.rot]
    }
    
  }

}
module.exports = Piece;
