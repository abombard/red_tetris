import React, { PropTypes } from 'react'

const RoomItem = ({ name, playerCount, onRoomClick, maxPlayer }) => {
  function handleClick(e) {
        e.preventDefault()
        onRoomClick(name, 'player')
  }

  let link = playerCount < maxPlayer
  if (link) {
    return (
      <li>
        <a href="#" onClick={handleClick}>
          {`${name} ${playerCount.toString()} / ${maxPlayer}`}
        </a>
      </li>
    )
  }
  return (
    <li>
      {`${name} ${playerCount.toString()} / ${maxPlayer}`}
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
