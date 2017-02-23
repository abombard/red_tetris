import React, { PropTypes } from 'react'
import RoomItem from './RoomItem'

const RoomList = ({ rooms, onRefreshClick, onRoomClick }) => (
  <div>
    <button onClick={onRefreshClick}>
      {'Refresh'}
    </button>
    <ul>
      {rooms.map(room =>
       <RoomItem key = {room.name}
         {...room}
         onRoomClick = {onRoomClick}/>
      )}
    </ul>
  </div>
)

RoomList.propTypes = {
  rooms: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    playerCount: PropTypes.number.isRequired,
  }).isRequired).isRequired,
  onRefreshClick: PropTypes.func.isRequired,
  onRoomClick: PropTypes.func.isRequired,
}

export default RoomList
