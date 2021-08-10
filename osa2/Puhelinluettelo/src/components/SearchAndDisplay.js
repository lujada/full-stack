import React from 'react'
import phonebookService from '../services/persons'

const SearchAndDisplay = ({id, person, number, searchName, setPersons, persons, setRedMessage, setGreenMessage}) => {
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

export default SearchAndDisplay