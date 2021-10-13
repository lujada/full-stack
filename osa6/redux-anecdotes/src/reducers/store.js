import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import anecdoteReducer from './anecdoteReducer'
import notificationReducer from './notificationReducer'
import { combineReducers } from 'redux'
import filterReducer from './filterReducer'

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  message: notificationReducer,
  matches: filterReducer
})

const store = createStore(reducer, composeWithDevTools())

export default store

