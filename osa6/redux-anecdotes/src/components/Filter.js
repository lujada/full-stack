import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { filter } from '../reducers/filterReducer'

const Filter = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()

    const handleChange = (event) => {
        let search = event.target.value
        const matches = anecdotes.filter(anecdote => 
            anecdote.content.toLowerCase().includes(search.toLowerCase()))
        dispatch(filter(matches))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>

  )
}

export default Filter