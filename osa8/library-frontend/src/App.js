import React, { useState } from 'react'
import { useSubscription } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommended from './components/Recommended'
import { BOOK_ADDED } from './queries'


const App = () => {
  const [token, setToken] = useState('')
  const [page, setPage] = useState('authors')

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({subscriptionData}) => {
      window.alert(`Book ${subscriptionData.data.bookAdded.title} was added to the server`)
    }
  })

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
        {token ?
        <button onClick={() => setPage('recommended')}>recommended</button>
      :
      ''
      }
      </div>

      <Authors
        show={page === 'authors'} token={token}
      />

      <Books
        show={page === 'books'} token={token}
      />

      <NewBook
        show={page === 'add'}
      />

      <LoginForm
        show={page === 'login'} setToken={setToken} token={token}
        />
      <Recommended show={page === 'recommended'}
      />
    </div>
  )
}

export default App