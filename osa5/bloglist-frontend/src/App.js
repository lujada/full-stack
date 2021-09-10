import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('Login Tester')
  const [password, setPassword] = useState('asd123')
  const [user, setUser] = useState(null)

  //blogStates
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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

  const handleLogout = async (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload(false)
  }

  const loginForm = () => (
        <form onSubmit={handleLogin}>
          <div>
            Username: 
            <input type="text"
            value={username}
            name="username"
            onChange={({ target }) => setUsername(target.value)} />
      </div>

      <div>
        Password: 
        <input type="password" 
        value={password}
        name="password"
        onChange={({ target })  => setPassword(target.value)}/>
      </div>

      <button type="submit">login</button>
       </form>
    )

    const blogMapper = () => (
      blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )
  )

  const createBlog = async (event) => {
    event.preventDefault()

    const blogObject = {
      title: title,
      author: author,
      url: url
    }

    blogService.create(blogObject)
    .then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      setMessage(`A new blog ${blogObject.title} by ${blogObject.author} added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      setTitle('')
      setAuthor('')
      setUrl('')

    })
  }
  

  const blogForm = () => (
    <form onSubmit={createBlog}>
      <div>
        Title:
        <input type="text"
        value={title}
        name="title"
        onChange={({ target }) => setTitle(target.value)} />
      </div>

      <div>
        Author:
        <input type="text"
        value={author}
        name="author"
        onChange={({ target }) => setAuthor(target.value)} />
      </div>

      <div>
        Url:
        <input type="text"
        value={url}
        name="url"
        onChange={({ target }) => setUrl(target.value)} />
      </div>

      <button type="submit">create</button>
      </form>


  )

    const ErrorNotification = ({message}) => {
      if (message === null) {
        return null
      }
      return(
        <div className="error">
          {message}
        </div>
      )
    }

    const GreenNotification = ({message}) => {
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
          {user === null 
        ?
          <div>
          <h1>Login to application</h1>
          <ErrorNotification message={errorMessage}/>
          {loginForm()}
          </div>
        :
          <div>
          <h1>Blogs</h1>
          <GreenNotification message={message}/>
          <p>{user.username} logged in</p> 

          <button onClick={handleLogout}>
          Logout
          </button>

          <h2>Create new blog</h2>
          {blogForm()}
          {blogMapper()}
          </div>}
        </div>
      )

}
      

export default App