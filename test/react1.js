import chai from "chai"
import React from 'react'
import equalJSX from 'chai-equal-jsx'
import {createRenderer} from 'react-addons-test-utils'

import Game from '../src/client/components/Game'

chai.should()
chai.use(equalJSX)

describe('Game basic', () => {
  it('works', () => {
    const renderer = createRenderer()
    renderer.render(React.createElement(Game))
    const output = renderer.getRenderOutput()
    output.should.equalJSX(<Game/>)
  })
})

