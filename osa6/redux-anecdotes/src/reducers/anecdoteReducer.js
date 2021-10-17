import anecdoteService from '../services/anecdotes'


const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
  case 'VOTE':
    const id = action.data.id
    return state.map(anecdote => 
      anecdote.id !== id ? anecdote : action.data
    )

  case 'ADD_ANECDOTE': {
    const anecdote = action.data
    return [...state, anecdote]
  }
  case 'INIT_ANECDOTES': {
    return action.data
  }
  }
  return state
}



export const addVote = (anecdoteToUpdate) => {
  anecdoteToUpdate.votes = anecdoteToUpdate.votes +1
  const id = anecdoteToUpdate.id
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.update(anecdoteToUpdate, id)
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote,
    })
  }
}

export const newAnecdote = content => {
  return async (dispatch) => {
    const createdAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'ADD_ANECDOTE',
      data: createdAnecdote,
    }
    )
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })

  }
}

export default anecdoteReducer