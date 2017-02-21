import React, { PropTypes } from 'react'
import { connect } from 'react-redux'


const KeyBoard = ({ onKeyPress }) => (
  <div onKeyPress={onKeyPress} />
)

KeyBoard.propTypes = {
  onKeyPress: PropTypes.func.isRequired,
}

const mapStateToProps = () => ({
})

const mapDispatchToProps = (dispatch) => ({
  onKeyPress: (ev) => {
    console.log(`new event ${ev.type} ${ev.which}`)
    dispatch(keyPress(ev))
  },
})

const Input = connect(
  mapStateToProps,
  mapDispatchToProps
)(KeyBoard)

export default Input
