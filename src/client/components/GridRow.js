import React, { PropTypes } from 'react'
import GridCell from './GridCell'

const GridRow = ({ row }) => (
  <div className='GridRow'>
  {
    row.map((cell, key) => (
      <GridCell key={key} color={cell} />
    ))
  }
  </div>
)

GridRow.propTypes = {
  row: PropTypes.arrayOf(PropTypes.number).isRequired,
}

export default GridRow
