const initialState = null

let timerId = null

const notificationReducer = (state= initialState, action) => {

  switch (action.type) {
  case 'VOTE_MESSAGE':
    const voteNotification = action.data
    return voteNotification
        
  case 'EMPTY':
    return action.data
            
  default:
    return state
  }

}

export const setNotification = (notification, time) => {
  return async (dispatch) => {
    dispatch({
      type: 'VOTE_MESSAGE',
      data: notification
    })
    dispatch(emptyNotification(time))
  }
}

export const emptyNotification = (time) => {
  return async (dispatch) => {
    if (timerId !== null) {clearTimeout(timerId)}
    timerId = setTimeout(() => {
      dispatch({
        type: 'EMPTY',
        data: null
      })
    }, time * 1000)
  }
}

export default notificationReducer