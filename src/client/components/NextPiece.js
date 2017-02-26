import React, { PropTypes } from 'react'
import GridRow from './GridRow'

const NextPiece = ({ nextPiece }) => (
  <div className='nextPiece'>
    {
      nextPiece.map((row, key) => (
        <GridRow key={key} row={row} />
      ))
    }
  </div>
)

NextPiece.propTypes = {
  nextPiece: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired
}

export default NextPiece
