import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'


const App = () => {
  const [token, setToken] = useState('')
  const [page, setPage] = useState('authors')
/*
  if (!token) {
    return (
      <div>
        <h2>Login</h2>
        <LoginForm
        setToken={setToken} />
      </div>
    )
  }
  */

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? 
        <button onClick={() => setPage('add')}>add book</button>
         :
          <button onClick={() => setPage('login')}>log in</button>
        }
      </div>

      <Authors
        show={page === 'authors'} token={token}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <LoginForm
        show={page === 'login'} setToken={setToken} token={token}
        />
    </div>
  )
}

export default App