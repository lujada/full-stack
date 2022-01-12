import { gql } from '@apollo/client'

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String, $published: Int, $genres: [String]) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      published
      genres
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation editAuthor($id: ID!, $born: Int!) {
      editAuthor(
          id: $id,
          born: $born
      ) {
          name
          born
      }
  }
`

export const ALL_BOOKS = gql`
query {
  allBooks {
    id
    title 
    author {
      name
      born
    }
    published 
    genres
  }
}
`

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
    id
  }
}
`
 
export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const ME = gql`
query {
  me {
    username
    favoriteGenre
  }
}
`

