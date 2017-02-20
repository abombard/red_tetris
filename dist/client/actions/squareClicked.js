'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var SQUARE_CLICKED = exports.SQUARE_CLICKED = 'SQUARE_CLICKED';

var squareClicked = exports.squareClicked = function squareClicked(id) {
  return {
    type: SQUARE_CLICKED,
    id: id
  };
};