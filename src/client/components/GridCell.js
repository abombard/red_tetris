import React, { PropTypes } from 'react'

const colorMap = [
  'blank',
  'blue',
  'green',
  'pink'
]

const GridCell = ({ color }) => (
  <div className={`GridCell ${colorMap[color]}`} />
)

GridCell.propTypes = {
  color: PropTypes.number.isRequired,
}

export default GridCell
