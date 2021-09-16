import React, {useState} from 'react'

const Blog = ({blog, updateBlog, removeBlog, user}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [showAll, setShowAll] = useState(false)
  
  const toggleShowAll = () => {
    setShowAll(!showAll)
  }

  const updateLikes = (event) => {
    event.preventDefault()

    blog.likes = blog.likes +1
    blog.user = blog.user.id

    updateBlog(blog, blog.id)
  }

  const eraseBlog = () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`))
    {removeBlog(blog.id)}
  }

  return(
  <div style={blogStyle}>

    {showAll ?
    <div>
    {blog.title} {blog.author}
    <button onClick={toggleShowAll}>
    hide
    </button>
    <div>
    {blog.url}
    </div>
    <div>
      likes: {blog.likes}
      <button onClick={updateLikes}>
        like
      </button>
    </div>
    <div>
      {blog.user.name}
      </div>

{ user === blog.user.name ?
    <button onClick={eraseBlog}>
      remove
    </button>
    : ''
    }
    </div>
    : 
    <div>
      {blog.title} {blog.author}

    <button onClick={toggleShowAll}>
    show
    </button>
    </div> 
    }
  </div>  
  
  )}
export default Blog