'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Square = require('./Square');

var _Square2 = _interopRequireDefault(_Square);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Board = function Board(_ref) {
  var squares = _ref.squares,
      onSquareClick = _ref.onSquareClick;
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'div',
      { className: 'board-row' },
      _react2.default.createElement(_Square2.default, { onClick: function onClick() {
          return onSquareClick(0);
        }, value: squares[0] }),
      _react2.default.createElement(_Square2.default, { onClick: function onClick() {
          return onSquareClick(1);
        }, value: squares[1] }),
      _react2.default.createElement(_Square2.default, { onClick: function onClick() {
          return onSquareClick(2);
        }, value: squares[2] })
    ),
    _react2.default.createElement(
      'div',
      { className: 'board-row' },
      _react2.default.createElement(_Square2.default, { onClick: function onClick() {
          return onSquareClick(3);
        }, value: squares[3] }),
      _react2.default.createElement(_Square2.default, { onClick: function onClick() {
          return onSquareClick(4);
        }, value: squares[4] }),
      _react2.default.createElement(_Square2.default, { onClick: function onClick() {
          return onSquareClick(5);
        }, value: squares[5] })
    ),
    _react2.default.createElement(
      'div',
      { className: 'board-row' },
      _react2.default.createElement(_Square2.default, { onClick: function onClick() {
          return onSquareClick(6);
        }, value: squares[6] }),
      _react2.default.createElement(_Square2.default, { onClick: function onClick() {
          return onSquareClick(7);
        }, value: squares[7] }),
      _react2.default.createElement(_Square2.default, { onClick: function onClick() {
          return onSquareClick(8);
        }, value: squares[8] })
    )
  );
};

Board.propTypes = {
  onSquareClick: _react.PropTypes.func.isRequired,
  squares: _react.PropTypes.arrayOf(_Square2.default).isRequired
};

exports.default = Board;