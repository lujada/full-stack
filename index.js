const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
require('dotenv').config()
const Contact = require('./models/contact')


app.use(express.static('build'))
app.use(express.json())
app.use(cors())

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === "CastError") {
    return response.status(400).send({error: "malformatted id"})
    } else if (error.name === "ValidationError") {
      return response.status(400).json({error:"Name must be unique and at least 3 characters long. Numbers must contain at least 8 characters."})
    }
    next(error)
}

morgan.token('body', (req) => JSON.stringify(req.body) )
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/api/persons', (request, response) => {
    Contact.find({})
    .then(contacts => {
      response.json(contacts)
    })
    .catch(error => {
      console.log("Something went wrong getting the data")
      next(error)
    })
})


app.get('/info', (request, response) => {
 
  Contact.count()
  .then(maara => 
    response.json(`Phonebook has info for ${maara} people     ${new Date()}`))
  })
  



 /* response.send(`
  <p>Phonebook has info for ${maara)} people</p>
  <p>${new Date()}</p>`)
  */
app.get('/api/persons/:id', (request, response, next) => {
Contact.findById(request.params.id)
.then(contact => {
  if (contact) {
    response.json(contact)
  }
  else {
    response.status(404).end()
  }
})
  .catch(error => next(error))
})


app.delete('/api/persons/:id', (request, response) => {
    Contact.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
  })

  


  const generateId = () => {
    const Id = 
    Math.floor(Math.random() * 101)
    return Id
  }
  console.log(generateId())



  app.post('/api/persons', (request, response, next) => {
    const person = request.body

    const contact = new Contact({
      name: person.name,
      number: person.number,
    })

    console.log("contact" ,contact)
    
    contact.save()
    .then(savedContact => {
      response.json(savedContact)})
    .catch(error => next(error.toJSON()))
  })



app.put('/api/persons/:id', (request, response, next) => {
  const person = request.body

  const contact = {
    name: person.name,
    number: person.number,
  }

  Contact.findByIdAndUpdate(request.params.id, contact, {new: true})
  .then(updatedContact => {
    response.json(updatedContact)
  })
  .catch(error => next(error))
})



  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
