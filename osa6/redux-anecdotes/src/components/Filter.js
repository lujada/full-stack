import React from 'react'
import { connect } from 'react-redux'
import { filter } from '../reducers/filterReducer'

const Filter = (props) => {
  const handleChange = (event) => {
    let search = event.target.value
    props.filter(search.toLowerCase())
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

const mapDispatchToProps = {
  filter
}

export default connect(
  null,
  mapDispatchToProps
) (Filter)