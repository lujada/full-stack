import React from 'react'
import { useParams } from 'react-router-dom'

const User = ( { users } ) => {

  const id = useParams().id
  const user = users.find(user => user.id === id)
  if (!user) {return null}
  const blogs = user.blogs
  return(
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>

      {blogs.map(blog =>
        <li key={blog.id}>
          {blog.title}
        </li>)}
    </div>
  )
}

export default User