import React from 'react'
import { useDispatch, connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const AnecdotesList = (props) => {
  const search = props.search
  const anecdotes = props.anecdotes
  const dispatch = useDispatch()

  const byLikes = (a, b) => {
    return parseInt(b.votes - a.votes)
  }

  let sortedAnecdotes = [...anecdotes]
  sortedAnecdotes.sort(byLikes)

  let matches = sortedAnecdotes.filter(anecdote =>
    anecdote.content.toLowerCase().includes(search)
  )  

  const voteAnecdote = (anecdote) => {
    dispatch(addVote(anecdote))
    props.setNotification(`You voted the anecdote "${anecdote.content}"`, 10)
  }
    
    
  return (
    <div>
      {search.length === 0 
        ?
        sortedAnecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
            has {anecdote.votes}
              <button onClick={() => voteAnecdote(anecdote)}>vote</button>
            </div>
          </div>) 
        :
        matches.map(anecdote =>
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

const mapStateToProps = (state) => {
  return {
    message: state.message,
    search: state.search,
    anecdotes: state.anecdotes
  }
}

const mapDispatchToProps = {
  setNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdotesList)