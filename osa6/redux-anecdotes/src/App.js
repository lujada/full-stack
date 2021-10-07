import React from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdotesList from './components/AnecdotesList'

const App = () => {
 
  return (
    <div>
      <h1>Anecdotes</h1>
      <AnecdoteForm/>
      <p></p>
      <AnecdotesList/>
    </div>
  )
}

export default App