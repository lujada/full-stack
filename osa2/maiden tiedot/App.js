import React, { useState, useEffect } from 'react'
import axios from 'axios'
const api_key = process.env.REACT_APP_API_KEY
console.log(api_key, 'avain')

const Display = ({matches}) => {

  const [weather, setWeather] = useState({})

  if (matches.length > 10)
  {return(
    <p>Too many matches, specify another filter</p>
  )}

  if (matches.length <= 10 && matches.length > 1)
    {return(
      matches.map(country => <p>{country.name}</p>)
    )}

    if (matches.length === 1)
    {console.log('one result', matches[0].name)
    console.log('languages', matches[0].languages[0].name)
    axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${matches[0].name}`)
    .then(res => {
      console.log(res, 'response')
      setWeather(res)
      })
      console.log(weather, 'wetter')
    
    return(
      <div>
        <h1>{matches[0].name}</h1>
        Capital: {matches[0].capital}
        <p>Population: {matches[0].population}</p>

        <h2>Languages:</h2>
        {matches[0].languages.map(language => <li key={language.name}>{language.name}</li>)}

        <p><img src={matches[0].flag} alt='flag' height='100'/> </p>

        <p>temperature: {weather.data.current.temperature} Celsius</p>

        <p><img src={weather.data.current.weather_icons[0]} alt='weather' height='100'/> </p>

        <p>wind: {weather.data.current.wind_speed} mph direction {weather.data.current.wind_dir} </p>
        
      </div>
         
    )
}
return(null)
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [countrySearch, setCountrySearch] = useState('Fin')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  console.log('render', countries.length, 'notes')


  const handleResults = (event) => {
    console.log('search', event.target.value)
    setCountrySearch(event.target.value)
  }

  const matches = countries.filter(country => 
    country.name.includes(countrySearch.charAt(0).toUpperCase() + countrySearch.slice(1))
)
    console.log('matches', matches)
  return (
    <div>
      find countries: <input 
      value={countrySearch}
      onChange={handleResults} />

      <Display matches={matches} />
    </div>
  
  )
}

export default App