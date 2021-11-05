/*eslint-disable*/
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router'
import { dispatchComment } from '../reducers/blogReducer'

const CommentMapper = ( {content} ) => {
  return(
    <div>
  <li>{content}</li>
  </div>
  )
}


const BlogRedux2 = ({ blogs, user }) => {
    const history = useHistory()

    const [comment, setComment] = useState('')

    const id = useParams().id
    const blog = blogs.find(blog => blog.id === id)
    if (!blog) {return null}
    if (!user) {return null}

    const username = user.username

    const mapComments = () => blog.comments.map(comment => 
     <CommentMapper key={comment.id} content={comment.content} />
    )


  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
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

    history.push('/')
  }


    const addComment = (event) => {
      event.preventDefault()

      const content = event.target.comment.value


      const comment = {
        content: content,
        blog: blog.id
      }

      dispatch(dispatchComment(comment))


      


    }
  

  return(
    <div>
    <div style={blogStyle} className='blog'>
         <h1> {blog.title}</h1>
         <div>
           <a href='url'> {blog.url} </a>
           </div>

      <div>  
      likes: {blog.likes}
      <button onClick={updateLikes}>
        like
      </button>
      </div>  
      <div>
            {blog.author}
        </div> 
        <div>
            Added by {blog.user.username}
        </div>
<div>
          { username === blog.user.username ?
            <button onClick={eraseBlog}>
      remove
            </button>
            : ''
          }
          </div>   
    </div>
    <h3>Comments</h3>
    <form onSubmit={addComment}>
      <input name="comment"/>
      <button type='submit'>Add comment</button>
      </form>
    {mapComments()}
    </div>

  )}
export default BlogRedux2