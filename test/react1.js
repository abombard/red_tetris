import chai from "chai"
import React from 'react'
import equalJSX from 'chai-equal-jsx'
import {createRenderer} from 'react-addons-test-utils'

import Game from '../src/client/components/Game'
import Grid from '../src/client/components/Grid'
import NextPiece from '../src/client/components/NextPiece'
import Shadow from '../src/client/components/Shadow'
import RoomList from '../src/client/components/RoomList'
import RoomItem from '../src/client/components/RoomItem'


chai.should()
chai.use(equalJSX)
/*
describe('Game basic', () => {
  it('works', () => {
    const renderer = createRenderer()
    renderer.render(React.createElement(Game))
    const output = renderer.getRenderOutput()
    output.should.equalJSX(<Game/>)
  })
})
*/
describe('react test', function(){
  it('game comp works', function(){
    const renderer = createRenderer()
    renderer.render(React.createElement(Game))
    const output = renderer.getRenderOutput()
    output.should.equalJSX(
      <div className='game'>
      <Grid grid={undefined} />
      <div className='infoContainer'>
      <div className='nextPieceContainer'>
      <NextPiece nextPiece={undefined} />
      </div>
      <div className='shadowContainer'>
      <Shadow shadow={undefined} />
      </div>
      </div>
      </div>

    )
  })
  it('roomitem comp works', function(){
    const renderer = createRenderer()
    renderer.render(React.createElement(RoomItem, {name: 'lle',playerCount: 2,  maxPlayer: 4}))
    const output = renderer.getRenderOutput()
    output.should.equalJSX(

      <li className="list-group-item">
      <a
      href="#"
      onClick={function noRefCheck() {}}
      >
      lle
      </a>
      <span className="badge">
      2 / 4
      </span>
      </li> 

    )
  })
  it('roomitem comp works with too mich players', function(){
    const renderer = createRenderer()
    renderer.render(React.createElement(RoomItem, {name: 'lle',playerCount: 40,  maxPlayer: 4}))
    const output = renderer.getRenderOutput()
    output.should.equalJSX(
       <li className="list-group-item">
        lle
        <span className="badge">
          40 / 4
        </span>
      </li> 


    )
  })

})
