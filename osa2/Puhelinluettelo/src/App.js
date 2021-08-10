import React, { useState, useEffect } from 'react'
import phonebookService from './services/persons'

//Notification message styles
const RedNotification = ({ redMessage }) => {
  if (redMessage === null) {
    return null
  }

  return (
    <div className="red">
      {redMessage}
    </div>
  )
}

const GreenNotification = ({ greenMessage }) => {
  if (greenMessage === null) {
    return null
  }

  return (
    <div className="green">
      {greenMessage}
    </div>
  )
}


//Search -> display contacts
const Search = ({id, person, number, searchName, setPersons, persons, setRedMessage, setGreenMessage}) => {
  const lowerName = person.toLowerCase()
  const searchLower = searchName.toLowerCase()
  const match = lowerName.includes(searchLower) 
  if (match === true) {return(
    <DisplayContacts id={id} person={person} number={number} persons={persons} setPersons={setPersons} setRedMessage={setRedMessage} />)}
  else
    {return(null)}
}

const DisplayContacts = ({id, person, number, setPersons, persons, setRedMessage}) => {

  return(
    <div>{person} {number}
    <button onClick={() => {if (window.confirm(`Delete ${person}?`))

    {
      phonebookService.remove(id) 
      .then(deleted => {
        setRedMessage(
          `Removed ${person}`
        )
        setTimeout(() => {
          setRedMessage(null)
        }, 5000)
        setPersons(persons.filter(person => person.id !== id))
      } )
      .catch(error => {
        setRedMessage(
          `Information of ${person} has already been removed from the server`
        )
        setTimeout(() => {
          setRedMessage(null)
        }, 5000)
      })
    }
    }} >
    delete
    </button>
    </div>
  )
}

//Component for the form with name & number
const FormComponent = (props) => {
  return(
    <form onSubmit={props.addPerson}>
        name: <input
          value={props.newName}
          onChange={props.handleContactChange}
          />
        <div>
        number: <input 
          value={props.newNumber}
          onChange={props.handleNumberChange}/>
        </div>
          <button type="submit">add</button>
      </form>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ searchName, setSearchName] = useState('')
  const [redMessage, setRedMessage] = useState(null)
  const [greenMessage, setGreenMessage] = useState(null)


//add contact and replace number
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    const namesList = persons.map(person => ({name: person.name, id: person.id}))

    const duplicate = namesList.filter(person => person.name === newName) 

    if (duplicate.length === 1)
    {if (window.confirm(`${newName} is already added to phonebook,
     replace with new number?`))
    {
      phonebookService.put(duplicate[0].id, personObject)
      .then(returnedContact => {
        setGreenMessage(
          `Replaced number of ${newName}`
        )
        setTimeout(() => {
          setGreenMessage(null)
        }, 5000)      
        setPersons(persons.map(person => person.id !== duplicate[0].id ? person : returnedContact))})
      setNewName('')
      setNewNumber('')
    }
    }
    
    if (duplicate.length === 0) {
      phonebookService.create(personObject)
      .then(returnedContact => {
        setGreenMessage(
          `Added ${personObject.name}`
        )
        setTimeout(() => {
          setGreenMessage(null)
        }, 5000)
        setPersons(persons.concat(returnedContact))
      } )
      .catch(error => {
        //console.log(error.response.data)
        setRedMessage(`${error.response.data.error}`)
        setTimeout(() => {
          setRedMessage(null)
        }, 5000)
      })
        setNewName('')
        setNewNumber('')
    }
  }


  useEffect(() => {
    phonebookService.getAll()
    .then(initialContacts => {
      setPersons(initialContacts)
    })
  },[])

  const handleContactChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleResults = (event) => {
    console.log('search', event.target.value)
    setSearchName(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <RedNotification redMessage={redMessage} />
      <GreenNotification greenMessage={greenMessage} />


      search: <input 
        value={searchName}
        onChange={handleResults}/>

      <FormComponent addPerson={addPerson} newName={newName} handleContactChange={handleContactChange} 
      newNumber={newNumber} handleNumberChange={handleNumberChange}/>

    
      <h2>Numbers</h2>
      <ul>
      {persons.map(person => 
        <Search key={person.id} id={person.id} person={person.name} number={person.number} searchName={searchName} persons={persons} setPersons={setPersons} setRedMessage={setRedMessage}/>)}
      </ul>
    </div>
  )

}

export default App