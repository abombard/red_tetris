import React, { PropTypes } from 'react'
import RoomItem from './RoomItem'
import FontAwesome from 'react-fontawesome'
import './RoomList.css'

const onChangeHandler = (handler) => ((evt) => {
  handler(evt.target.value)
})

const RoomList = ({ rooms, createName, onRefreshClick, onRoomClick, onCreateRoomChange, onCreateClick }) => (
  <div>
    <input placeholder='name' type='text' value={createName} onChange={onChangeHandler(onCreateRoomChange)} />
    <button onClick={onCreateClick}>
      {'Create'}
    </button> <br/>
    <div>
      <ul className='list-group'>
        <li className='list-group-item active'>
          Rooms
          <FontAwesome
            className='pull-right fa-lg refresh'
            name='refresh'
            onClick={onRefreshClick}/>
        </li>
        {rooms.map(room =>
         <RoomItem key = {room.name}
           {...room}
           onRoomClick = {onRoomClick}/>
        )}
      </ul>
    </div>
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
