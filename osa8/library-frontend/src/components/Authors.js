import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS, EDIT_BDATE } from '../queries'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)

  const [name, setName] = useState('')
  let [born, setBorn] = useState('')

  const [ editBdate ] = useMutation(EDIT_BDATE, {
    refetchQueries: [ {query:ALL_AUTHORS} ]
  })

  const submit = (event) => {
    event.preventDefault()

    let setBornTo = parseInt(born)
    editBdate({ variables: { name, setBornTo }})

    setName('')
    setBorn('')


  }

  const handleChange = (event) => {
    
    setName(event.target.value)
  }

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }
  else
  {
    
    let names = result.data.allAuthors.map(author => author.name)

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {result.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <div>
        <h2>Set birthyear</h2>
        <form onSubmit={submit}>
          <div>
            name:
            <select onChange={handleChange}>
            {names.map(name => <option key={name} value={name}>
              {name}
            </option>)}
            </select>
            </div>
            <div>
              born:
              <input
              value={born}
              onChange={({target}) => setBorn(target.value)} />
            </div>
            <button type='submit'>update author</button>

        </form>
      </div>

    </div>
  )
            }
}

export default Authors