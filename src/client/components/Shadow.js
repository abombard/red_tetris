import React, { PropTypes } from 'react'
import GridRow from './GridRow'

const Shadow = ({ shadow }) => (
  	<div className='shadow'>
		{
	    	shadow.map((row, key) => (
	     	<GridRow key={key} row={row} />
	    	))
	  	}
	</div>
)

Shadow.propTypes = {
  shadow: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired
}

export default Shadow