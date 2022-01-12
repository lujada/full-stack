import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [bookGenre, setBookGenre] = useState(null)


  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  //map all possible genres for buttons and filter which books to show

    let mapGenres = result.data.allBooks.map(book => book.genres)

    let genres = mapGenres.flat()

    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }

    genres = genres.map(genre => genre.toLowerCase())
    genres = genres.filter(onlyUnique)

    let booksToShow = result.data.allBooks

    if (bookGenre !== null) {
      booksToShow = result.data.allBooks.filter(book => book.genres.includes(bookGenre.genre))
    }
    
  return (
    <div>
      <h2>books</h2>
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

      <div>
        {genres.map(genre => 
          <button key={genre} onClick={() => setBookGenre({genre})}>{genre}</button>
          )}
          <button onClick={() => setBookGenre(null)}>all genres</button>
      </div>

    </div>

    
  )
}

export default Books