/*eslint-disable*/
import React from 'react'
import { Link } from 'react-router-dom'


const Users = ( { name, blogs, id } ) => {
  let blogAmount = blogs.length
  return(
    
     <tr>
      <td>
      <Link to={`/users/${id}`}>{name}</Link>
      </td>
      <td>
      {blogAmount}
      </td>
      </tr>
      
      
    
  )

}

export default Users