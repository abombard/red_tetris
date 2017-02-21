import React, { PropTypes } from 'react'

const GridCell = ({ color }) => (
  <div className={`GridCell ${color}`} />
)

GridCell.propTypes = {
  color: PropTypes.string.isRequired,
}

export default GridCell
