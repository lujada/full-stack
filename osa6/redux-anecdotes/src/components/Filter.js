import React from 'react'
import { useDispatch } from 'react-redux'
import { filter } from '../reducers/filterReducer'

const Filter = () => {
    const dispatch = useDispatch()
    const handleChange = (event) => {
          let search = event.target.value
          dispatch(filter(search.toLowerCase()))
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