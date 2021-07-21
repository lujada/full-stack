const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
require('dotenv').config()
const Contact = require('./models/contact')


app.use(express.static('build'))
app.use(express.json())
app.use(cors())

morgan.token('body', (req) => JSON.stringify(req.body) )
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/api/persons', (request, response) => {
    Contact.find({}).then(contacts => {
      response.json(contacts)
    })
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



const PORT = process.env.PORT
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
