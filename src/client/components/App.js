import React from 'react'
import './App.css'

const App = ({children}) => (
  <div className='app center-block'>
    <h4>{'RED TETRIS'}</h4>
    <div>
      {children}
    </div>
  </div>
)

export default App
