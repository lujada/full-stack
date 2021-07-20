const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

app.use(express.json())

app.use(cors())

morgan.token('body', (req) => JSON.stringify(req.body) )
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
  { 
    name: "Arto Hellas", 
    number: "040-123456",
    id: 1
  },
  { 
    name: "Ada Lovelace", 
    number: "39-44-5323523",
    id: 2
  },
  { 
    name: "Dan Abramov", 
    number: "12-43-234345",
    id: 3
  },
  { 
    name: "Mary Poppendieck", 
    number: "39-23-6423122",
    id: 4
  }
]



/*
let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2020-01-10T17:30:31.098Z",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2020-01-10T18:39:34.091Z",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2020-01-10T19:20:14.298Z",
    important: true
  }
]

*/
app.get('/api/persons', (req, res) => {
    res.json(persons)
    })


app.get('/info', (req, res) => {
  res.send(`
  <p>Phonebook has info for ${persons.length} people</p>
  <p>${new Date()}</p>`)
})

  
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
})


app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    
    response.status(204).end()
  })

  


  const generateId = () => {
    const Id = 
    Math.floor(Math.random() * 101)
    return Id
  }
  console.log(generateId())



  app.post('/api/persons', (request, response) => {
    const person = request.body

    if (!person.name) {
      return response.status(400).json({ 
        error: 'name is missing' 
      })
    }

    if (!person.number) {
      return response.status(400).json({
        error: 'number is missing'
      })
    }

    const names = persons.map(person => person.name.toLowerCase())
    if (names.includes(person.name.toLowerCase())) {
      return response.status(400).json({
        error: 'name must be unique'
      })
    }

    const contactData = {
      name: person.name,
      number: person.number,
      id: generateId(),
    }
    //console.log(contactData)
    persons = persons.concat(contactData)
  
    response.json(person)
  })



const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
