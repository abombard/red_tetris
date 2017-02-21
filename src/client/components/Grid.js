import React, { PropTypes } from 'react'
import GridRow from './GridRow'

const Grid = ({ grid }) => (
  <div className='Grid'>
  {
    grid.map((row, key) => (
      <GridRow key={key} row={row} />
    ))
  }
  </div>
)

Grid.propTypes = {
  grid: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
}

export default Grid
