/*eslint-disable*/
import React from 'react'

const Users = ( { name, blogs } ) => {
  let blogAmount = blogs.length
  return(
      <tr>
      <td>
      {name}
      </td>
      <td>
      {blogAmount}
      </td>
      </tr>
      
    
  )

}

export default Users