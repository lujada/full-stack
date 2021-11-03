/*eslint-disable*/
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogRedux = ({ blog, poster }) => {


  const dispatch = useDispatch()

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

    const likedBlogForBackend = {...blog, likes: blog.likes +1, user: blog.user.id
    }
    dispatch(likeBlog(likedBlogForBackend, blog.id, blog))
  }


  const eraseBlog = () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`))
    {dispatch(deleteBlog(blog.id))
    dispatch(setNotification(`Blog removed succesfully`, 'green'))
    }
  }

  return(
    <div style={blogStyle} className='blog'>

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

          { poster === blog.user.name ?
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
export default BlogRedux