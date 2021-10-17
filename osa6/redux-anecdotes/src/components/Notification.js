import React from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const Notification = (props) => {
  const notification = props.message
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div>
      {notification === null ? '':<div style={style}> {notification} </div>}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    message: state.message
  }
}

const mapDispatchToProps = {
  setNotification
}

const ConnectedNotification = connect(
  mapStateToProps,
  mapDispatchToProps)(Notification)
export default ConnectedNotification