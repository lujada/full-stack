import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'

const Recommended = (props) => {
    const result = useQuery(ALL_BOOKS)
    const user = useQuery(ME)

    if (!props.show) {
        return null
    }

    if (result.loading) {
        return <div>loading...</div>
        }

    //else (user logged in and results loaded: filter and show recommended books)
    let genre = user.data.me.favoriteGenre
    let booksToShow = result.data.allBooks.filter(book => book.genres.includes(genre))

    return(
        <div>
        <h2>Recommended books</h2>
        <p>Books in the <b>{genre}</b> genre</p>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>
                author
              </th>
              <th>
                published
              </th>
            </tr>
            {booksToShow.map(a =>
              <tr key={a.id}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
    )   
}

export default Recommended

