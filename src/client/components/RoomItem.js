import React, { PropTypes } from 'react'

const RoomItem = ({ name, playerCount, onRoomClick }) => {
  function handleClick(e) {
        e.preventDefault()
        onRoomClick(name, 'player')
  }

  return (
    <li>
      <a href="#" onClick={handleClick}>
        {`${name} ${playerCount.toString()} / 4`}
      </a>
    </li>
  )
}

RoomItem.propTypes = {
  name: PropTypes.string.isRequired,
  playerCount: PropTypes.number.isRequired,
  onRoomClick: PropTypes.func.isRequired,
}

export default RoomItem
