/*eslint-disable*/
import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/loginForm'
import BlogForm from './components/blogForm'
import Togglable from './components/Togglable'
import { setNotification } from './reducers/notificationReducer'
import NotificationRedux from './components/NotificationRedux'

const App = () => {
  const dispatch = useDispatch()

  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password
      })


      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')

    } catch (exception) {
      dispatch(setNotification('Invalid username or password', 'red'))
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload(false)
  }

  const loginForm = () => {
    return(
      <Togglable buttonLabel="log in">
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>
    )}

  //Order blogs by likes
  const byLikes = (a, b) => {
    return parseInt(b.likes) - parseInt(a.likes)
  }
  let sortedBlogs = [...blogs]
  sortedBlogs.sort(byLikes)

  //Map blogs for display
  const blogMapper = () => (
    sortedBlogs.map(blog =>
      <Blog key={blog.id} blog={blog} updateBlog={updateBlog} removeBlog={removeBlog} user={user.name} />
    )
  )


  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService.create(blogObject)

      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        dispatch(setNotification(`A new blog ${blogObject.title} by ${blogObject.author} added`, 'green'))
      })
  }

  const updateBlog = (blogObject, id) => {
    blogService.update(blogObject, id)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      })
  }

  const removeBlog = (id) => {
    blogService.remove(id, user.token)
      .then(setBlogs(blogs.filter(blog => blog.id !== id))
      )
      dispatch(setNotification(`Blog removed succesfully`, 'green'))
  }

  const blogForm = () => {
    return(
      <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
    )}

  //Display
  return(
    <div>
      <NotificationRedux/>

      {user === null
        ? <h1>Login to application</h1> : null}

      {user === null
        ? loginForm()
        :
        <div>
          <h1>Blogs</h1>
          <p>{user.username} logged in</p>

          <button onClick={handleLogout}>
          Logout
          </button>
          <p></p>

          {blogForm()}
          {blogMapper()}
        </div>}
    </div>
  )

}

export default App