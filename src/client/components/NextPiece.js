import React, { PropTypes } from 'react'

const NextPiece = ({ nextPiece }) => (
  <div className='nextPiece'>
  	{ console.log('DEBUG:'+nextPiece+'!!!!!!!!!!!!!!')}
  	{ nextPiece }
  </div>
)

NextPiece.propTypes = {
  nextPiece: PropTypes.number.isRequired
}

export default NextPiece
