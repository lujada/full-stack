import React, { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdotesList from './components/AnecdotesList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])
 
  return (
    <div>
      <Notification/>
      <h1>Anecdotes</h1>
      <p></p>
      <Filter/>
      <AnecdotesList/>
      <AnecdoteForm/>
    </div>
  )
}

export default App