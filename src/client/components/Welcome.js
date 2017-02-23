import React from 'react'

const Welcome = ({playerName, roomName}) => (
  <div>
    <p>{ `Welcome ${playerName} to ${roomName}` }</p>
  </div>
)

export default Welcome
