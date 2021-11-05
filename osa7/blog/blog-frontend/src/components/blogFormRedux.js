/*eslint-disable*/
import React from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import useField from '../hooks/index'
import { setNotification } from '../reducers/notificationReducer'
import { useHistory } from 'react-router'

const BlogFormRedux = () => {
  const dispatch = useDispatch()

  const history = useHistory()

    const {reset: resetTitle, ...title} = useField('text')
    const {reset: resetAuthor, ...author} = useField('text')
    const {reset: resetUrl, ...url} = useField('text')

    const reset = (event) => {
      event.preventDefault()

      resetTitle(event)
      resetAuthor(event)
      resetUrl(event)
    }

    const handleSubmit = (event) => {
      event.preventDefault()

      let blog = {
        title: title.value,
        author: author.value,
        url: url.value
      }
      dispatch(createBlog(blog))
      dispatch(setNotification(`A new blog ${title.value} by ${author.value} added`, 'green'))
      reset(event)

      history.push('/')
    }

  return(
    <div>
      <form>
        Title:
        <input {...title} /> <br/>
        Author:
        <input {...author} /> <br/>
        Url:
        <input {...url} /> <br/>
        <button onClick={handleSubmit}>create</button>
        <button onClick={reset}>reset</button>
      </form>
    </div>
  )
}

export default BlogFormRedux