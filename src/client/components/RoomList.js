import React, { PropTypes } from 'react'
import RoomItem from './RoomItem'

const onChangeHandler = (handler) => ((evt) => {
  handler(evt.target.value)
})

const RoomList = ({ rooms, createName, onRefreshClick, onRoomClick, onCreateRoomChange, onCreateClick }) => (
  <div>
    <input type='text' value={createName} onChange={onChangeHandler(onCreateRoomChange)} />
    <button onClick={onCreateClick}>
      {'Create'}
    </button>
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
  onCreateClick: PropTypes.func.isRequired,
}

export default RoomList
