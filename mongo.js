const mongoose = require('mongoose')
if (process.argv.length == 5) {
  
  const password = process.argv[2]
  const name = process.argv[3]
  const number = process.argv[4]


  const url =
  `mongodb+srv://fullstack:${password}@cluster0.b3tyt.mongodb.net/?retryWrites=true&w=majority`

  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

  const contactSchema = new mongoose.Schema({
    name: String,
    number: String,
  })

  const Contact = mongoose.model('Contact', contactSchema)

  const contact = new Contact({
    name: name,
    number: number, 
  })

  contact.save().then(response => {
    console.log('response', response)
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}

  if (process.argv.length == 3) {
    const password = process.argv[2]

    const url =
  `mongodb+srv://fullstack:${password}@cluster0.b3tyt.mongodb.net/test?retryWrites=true&w=majority`

  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

  const contactSchema = new mongoose.Schema({
    name: String,
    number: String,
  })

  const Contact = mongoose.model('Contact', contactSchema)

  Contact.find({}).then(result => {
    result.forEach(contact => {
      console.log(contact.name, contact.number)
    })
    mongoose.connection.close()
  })

}



  else {
    console.log(process.argv.length)
}

/*
const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.b3tyt.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})
const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'Callback functions suck',
  date: new Date(),
  important: true,
})

note.save().then(response => {
  console.log('note saved!')
  mongoose.connection.close()
})


Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})
*/