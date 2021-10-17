import React from 'react'
import { connect } from 'react-redux'
import {  newAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.newAnecdote(content)
    props.setNotification(`Created anecdote "${content}"`, 10)
  }

        
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes
  }
}
    
const mapDispatchToProps = {
  setNotification,
  newAnecdote
}
    
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteForm)