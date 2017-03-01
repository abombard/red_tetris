import React, { PropTypes } from 'react'

const colorMap = [
  'blank',
  'orange-piece', // L inversé
  'yellow-piece', // L
  'red-piece', // Z
  'green-piece', // S
  'pink-piece',  // T
  'light-blue-piece', // I
  'blue-piece', // carré
  'grey'
]
colorMap[42] = 'black'

const GridCell = ({ color }) => (
  <div className={`GridCell ${colorMap[color]}`}>
    <div className={`innerGridCell ${colorMap[color]}`}>
    </div>
  </div> 
)

GridCell.propTypes = {
  color: PropTypes.number.isRequired,
}

export default GridCell
