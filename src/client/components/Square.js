import React, { PropTypes } from 'react'

const Square = ({ value, onClick }) => (
	<button className="square" onClick={onClick}>
	  {value}
	</button>
)

Square.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func.isRequired
}

export default Square
