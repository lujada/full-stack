import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const loginReducer = (state=null, action) => {
  switch(action.type) {
  case 'LOGIN':
    return action.data
  case 'LOGOUT':
    return action.data
  default:
    return state
  }
}

export const logIn = (username, password) => {
  let user = null
  return async (dispatch) => {
    try {
      user = await loginService.login({ username, password })
    }
    catch (exception) {
      dispatch(setNotification('Invalid username or password', 'red'))
    }
    if (user) {
      blogService.setToken(user.token)
      dispatch({
        type: 'LOGIN',
        data: user
      })
    }
  }
}

export const logOut = () => {
  return {
    type: 'LOGOUT',
    data: null
  }
}

export default loginReducer
