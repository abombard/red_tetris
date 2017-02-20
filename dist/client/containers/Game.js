'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _Board = require('../components/Board');

var _Board2 = _interopRequireDefault(_Board);

var _Square = require('../components/Square');

var _Square2 = _interopRequireDefault(_Square);

var _squareClicked = require('../actions/squareClicked');

require('./TicTacToe.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Game = function Game(_ref) {
  var squares = _ref.squares,
      onSquareClick = _ref.onSquareClick;
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_Board2.default, { onSquareClick: onSquareClick, squares: squares })
  );
};

Game.propTypes = {
  onSquareClick: _react.PropTypes.func.isRequired,
  squares: _react.PropTypes.arrayOf(_Square2.default).isRequired
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    squares: state.squares
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onSquareClick: function onSquareClick(id) {
      dispatch((0, _squareClicked.squareClicked)(id));
    }
  };
};

var App = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Game);

exports.default = App;