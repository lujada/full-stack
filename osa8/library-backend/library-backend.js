const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const mongoose = require('mongoose')
const config = require('./utils/config')
const jwt = require('jsonwebtoken')

const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const JWT_SECRET = config.JWT_SECRET
const MONGODB_URI = config.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
.then(() => {
  console.log('connected to MongoDB')
})
.catch((error) => {
  console.log('error connecting to MongoDB:', error.message)
})

const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

  type Book {
      title: String!
      author: Author
      published: Int!
      genres: [String!]!
      id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }

  type Query {
      bookCount: Int!
      authorCount: Int!
      allBooks(author: String, genre: String): [Book!]!
      allAuthors: [Author!]!
      me: User
  }

  type Mutation {
    addBook(
    title: String!
    published: Int
    author: String
    genres: [String]
    ): Book
    editAuthor(
      id: ID!
      born: Int
    ): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }

`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {

     if(!args.author && !args.genre)
      {return Book.find({})
      .populate('author')}

     if (args.genre)
      { return Book.find({genres: { $in: args.genre}}) }
    },

    allAuthors: async () => {
   return Author.find({})
    },

    me: (root, args, context) => {
      return context.currentUser  
    }

    },

    Author: {
      bookCount: async (root) => {
        let hits = await Book.find({author: {$in: root.id}})
       return hits.length
    }
  },

  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser)
      {
        return new AuthenticationError("Not authenticated")
      }

      let authorFind = await Author.findOne({name: args.author})

      if (!authorFind) {
        let author = new Author({name: args.author})
        await author.save()
        const book = new Book({...args, author: author.id})

        try {
          await book.save()
          } 
          catch (error) {
            throw new UserInputError(error.message, {
              invalidArgs: args,
            })
          }
          return book
      }

      args.author = authorFind
      const book = new Book({ ...args }) 
      try {
      await book.save()
      } 
      catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return book
    },

    editAuthor: async (root, args, context) => {
      if (!context.currentUser)
      {
        return new AuthenticationError("Not authenticated")
      }

      const author = await Author.findById(args.id)
      author.born = args.born
      
      try {
      updatedAuthor = await Author.findByIdAndUpdate( {_id: args.id}, author, {new: true})
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    return author
    },

    createUser: async (root, args) => {
      const user = new User({username: args.username})

      return user.save()
      .catch(error => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })
    }, 

    login: async (root, args) => {
      const user = await User.findOne({username: args.username})

      if (!user || args.password !== 'secret') {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

       theToken = { value: jwt.sign(userForToken, JWT_SECRET) }
       return theToken
    }    
  }
  }

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null

    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})