/*eslint-disable*/
let timerId = null

const notificationReducer = (state=null, action) => {
    switch (action.type) {
        case 'MESSAGE':
            return action.data
        case 'EMPTY':
            return action.data
        default: 
            return state
    }
}

export const setNotification = (notification, color) => {
        return async (dispatch) => {
            dispatch({
            type: 'MESSAGE',
            data: {
                message: notification,
                style: color
            }
        })
        dispatch(emptyNotification())
    }
}

const emptyNotification = () => {
    return async (dispatch) => {
    if (timerId !== null) {clearTimeout(timerId)}
    timerId = setTimeout(() => {
      dispatch({
        type: 'EMPTY',
        data: null
      })
    }, 5000)
}
}

export default notificationReducer