import React from 'react'

const App = ({children}) => (
  <div id='outerGameboy'>
    <div id='innerGameboy'>
      <div id="lightContainer">
      	<div id="light"/>
      	<div className="indicator"/>
      	<div className="indicator"/>
      	<div className="indicator"/>
      </div>
      {children}
    </div>
  </div>
)

export default App
