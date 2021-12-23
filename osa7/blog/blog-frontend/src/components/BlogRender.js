import React from 'react'
import { Link } from 'react-router-dom'

const BlogRender = ( { blog } ) => {
  /*
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  */

  return(
    <td>
      <Link to={`/blogs/${blog.id}`}>{blog.title} </Link>
    </td>
  )
}

export default BlogRender