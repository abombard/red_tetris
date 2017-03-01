import React, { PropTypes } from 'react'

const RoomItem = ({ name, playerCount, onRoomClick, maxPlayer }) => {
  function handleClick(e) {
        e.preventDefault()
        onRoomClick(name, 'player')
  }

  let link = playerCount < maxPlayer
  if (link) {
    return (
      <li className='list-group-item'>
        <a href="#" onClick={handleClick}>
          {`${name}`}
        </a>
        <span className='badge'>{`${playerCount.toString()} / ${maxPlayer}`}</span>
      </li>
    )
  }
  return (
    <li className='list-group-item'>
      {`${name}`}
      <span className='badge'>{`${playerCount.toString()} / ${maxPlayer}`}</span>
    </li>
  )
}

RoomItem.propTypes = {
  name: PropTypes.string.isRequired,
  playerCount: PropTypes.number.isRequired,
  onRoomClick: PropTypes.func.isRequired,
  maxPlayer: PropTypes.number.isRequired,
}

export default RoomItem
