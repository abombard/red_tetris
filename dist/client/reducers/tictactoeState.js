'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _squareClicked = require('../actions/squareClicked');

var initialState = {
  squares: Array(9).fill(null),
  xIsNext: true
};

var reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case _squareClicked.SQUARE_CLICKED:
      var squares = state.squares.slice();
      squares[action.id] = state.xIsNext ? 'X' : 'O';
      return _extends({}, state, {
        squares: squares,
        xIsNext: !state.xIsNext
      });
    default:
      return state;
  }
};

exports.default = reducer;