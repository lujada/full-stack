/*eslint-disable*/
import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
//import Blog from './components/Blog'
import BlogRedux from './components/BlogRedux'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/loginForm'
//import BlogForm from './components/blogForm'
import Togglable from './components/Togglable'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { logIn, logOut } from './reducers/loginReducer'
import { initializeUsers } from './reducers/userReducer'
import NotificationRedux from './components/NotificationRedux'
import BlogFormRedux from './components/blogFormRedux'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Users from './components/Users'

const App = () => {
  const dispatch = useDispatch()

  //initialize blogs
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [])


  // get blogs and sort by likes
  const byLikes = (a, b) => {
    return parseInt(b.likes) - parseInt(a.likes)
  }
  const blogs = useSelector(state => 
    state.blogs.sort(byLikes)
  )

  const users = useSelector(state =>
    state.users)

  const user = useSelector(state => state.user)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = useRef()

  //login logout
  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(logIn(username, password))
  }

  const handleLogout = () => {
    dispatch(logOut())
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

  //Map blogs for display
  const blogMapper = () => (
    blogs.map(blog =>
      <BlogRedux key={blog.id} blog={blog} poster={user.name} />

    )
  )

  //Map users for display
  const userMapper = () => (
    <table>
      <tbody>
       <tr><th><h2>Users</h2></th><th><h3>Blogs created</h3></th></tr>
    {users.map(user => 
      <Users key={user.id} name={user.name} blogs={user.blogs} />
      )}
      </tbody>
      </table>
  )

  const blogForm = () => {
    return(
      <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
        <BlogFormRedux />
      </Togglable>
    )}

    const userStyle = {
      marginLeft: 200,
  }

//TABLE
  //Display
  return(
    <div>
      <div>{user === null
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
        
      <Router>
        <Switch>
        <Route path='/users'>
          {userMapper()}
          </Route>
        
        <Route path='/'>
      <NotificationRedux/>
        </Route>
        </Switch>
      </Router>
    </div>
  )

}

export default App