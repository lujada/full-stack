import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { emptyNotification, voteNotification } from '../reducers/notificationReducer'


const AnecdotesList = () => {

    const searchResults = useSelector(state => state.matches)
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()

    console.log('anecdotes', anecdotes)
    console.log('searchResults', searchResults)

    const byLikes = (a, b) => {
      return parseInt(b.votes - a.votes)
    }

    let sortedAnecdotes = [...anecdotes]
    sortedAnecdotes.sort(byLikes)

    const voteAnecdote = (props) => {
      dispatch(addVote(props[0]))
      dispatch(voteNotification(props[1]))
        setTimeout(() => 
        emptyMessage(), 5000)
    }

    const emptyMessage = () => {
      dispatch(emptyNotification())
    }

    
  return (
    <div>
      {searchResults.length === 0 
      ?
      sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteAnecdote([anecdote.id, anecdote.content])}>vote</button>
          </div>
        </div>) 
        :
        searchResults.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => voteAnecdote([anecdote.id, anecdote.content])}>vote</button>
            </div>
          </div>) 
        }
        </div>
  )}

  export default AnecdotesList