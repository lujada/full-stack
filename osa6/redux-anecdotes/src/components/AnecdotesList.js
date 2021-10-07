import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'


const AnecdotesList = () => {
    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()


    const byLikes = (a, b) => {
      return parseInt(b.votes - a.votes)
    }

    let sortedAnecdotes = [...anecdotes]
    sortedAnecdotes.sort(byLikes)


    
  return (
    <div>
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(addVote(anecdote.id))}>vote</button>
          </div>
        </div>)}
        </div>
  )}

  export default AnecdotesList