'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Square = function Square(_ref) {
  var value = _ref.value,
      onClick = _ref.onClick;
  return _react2.default.createElement(
    'button',
    { className: 'square', onClick: onClick },
    value
  );
};

Square.propTypes = {
  onClick: _react.PropTypes.func.isRequired,
  value: _react.PropTypes.string
};

exports.default = Square;