import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import anecdoteReducer from './anecdoteReducer'
import notificationReducer from './notificationReducer'
import { combineReducers } from 'redux'
import filterReducer from './filterReducer'

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  message: notificationReducer,
  search: filterReducer
})

const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(thunk)
))

export default store

