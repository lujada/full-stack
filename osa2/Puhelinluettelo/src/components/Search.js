import React from 'react'

const Search = ({id, person, number, searchName, setPersons, persons, setRedMessage, setGreenMessage}) => {
    const lowerName = person.toLowerCase()
    const searchLower = searchName.toLowerCase()
    const match = lowerName.includes(searchLower) 
    if (match === true) {return(
      <DisplayContacts id={id} person={person} number={number} persons={persons} setPersons={setPersons} setRedMessage={setRedMessage} />)}
    else
      {return(null)}
  }

export default Search