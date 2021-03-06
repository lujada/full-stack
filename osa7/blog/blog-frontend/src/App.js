import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import LoginForm from './components/loginForm'
import Togglable from './components/Togglable'
import { initializeBlogs } from './reducers/blogReducer'
import { logIn, logOut } from './reducers/loginReducer'
import { initializeUsers } from './reducers/userReducer'
import NotificationRedux from './components/NotificationRedux'
import BlogFormRedux from './components/blogFormRedux'
import { Switch, Route, Link, Redirect } from 'react-router-dom'
import Users from './components/Users'
import User from './components/User'
//import BlogRender from './components/BlogRender'
import BlogRedux from './components/BlogRedux2'

import { Table } from 'react-bootstrap'

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
    )
  }

  //Map blogs for display

  const blogMapper = () => (
    <div>
      <Table striped>
        <tbody>
          {blogs.map(blog =>
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>{blog.title}
                </Link>
              </td>
              <td>
                {blog.user.username}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )

  //Map users for display
  const userMapper = () => (
    <table>
      <tbody>
        <tr><th><h>Users</h></th><th><h3>Blogs created</h3></th></tr>
        {users.map(user =>
          <Users key={user.id} name={user.name} blogs={user.blogs} id={user.id} />
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

  //Display

  const padding = {
    padding: 5,
    background: 'silver'
  }

  return(
    <div className="container">

      <div>
        {user ? <div>
          <Link style={padding} to='/'>home</Link>
          <Link style={padding} to='/blogs'>blogs</Link>
          <Link style={padding} to='/users'>users</Link>
        </div> : ''
        }
        {user !== null ? <div><em>{user.username} logged in</em> <button onClick={handleLogout}>
          Logout
        </button> </div> : ''}
      </div>

      <div>
        {user === null
          ? <h1>Login to application</h1> : ''}

        {user === null
          ? loginForm()
          : ''}
      </div>

      <Switch>

        <Route path='/users/:id'>
          <User users={users} />
        </Route>

        <Route path='/users'>
          {userMapper()}
        </Route>

        <Route path='/blogs/:id'>
          {user ? <BlogRedux blogs={blogs} user={user} /> : <Redirect to="/" />}
        </Route>

        <Route path='/blogs'>
          {user ? <div>
            <h1>Blogs</h1>
            {blogForm()}
            {blogMapper()}
          </div>
            : <Redirect to='/' />
          }
        </Route>

        <Route path='/'>
          <h1>Blog App</h1>
          <p>Navigate by using the menu</p>
          <NotificationRedux/>
        </Route>
      </Switch>
    </div>
  )

}

export default App