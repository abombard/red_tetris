import React, { PropTypes } from 'react'

const Square = ({ value, onClick }) => (
  <button className='square' onClick={onClick}>
    {value}
  </button>
)

Square.propTypes = {
  onClick: PropTypes.func.isRequired,
  value: PropTypes.string,
}

export default Square
