import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/loginForm'
import BlogForm from './components/blogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('Login Tester')
  const [password, setPassword] = useState('asd123')
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
      setErrorMessage('Invalid username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
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
        setMessage(`A new blog ${blogObject.title} by ${blogObject.author} added`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)

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
  }

  const blogForm = () => {
    return(
      <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
    )}

  const ErrorNotification = ({ message }) => {
    if (message === null) {
      return null
    }
    return(
      <div className="error">
        {message}
      </div>
    )
  }

  const GreenNotification = ({ message }) => {
    if (message === null) {
      return null
    }
    return(
      <div className="green">
        {message}
      </div>
    )
  }

  //Display
  return(
    <div>
      <ErrorNotification message={errorMessage}/>
      <GreenNotification message={message}/>

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