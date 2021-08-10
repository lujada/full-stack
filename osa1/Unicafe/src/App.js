import React, { useState } from 'react'

const Title = (props) => {
  return(
  <div>
    <h1>{props.name}</h1>
  </div>
  )
}


const Statistics = (props) => {
  const average = (props.good - props.bad) / props.all
  const positive = (props.good / props.all) * 100

  if (props.all === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  
  return(

    <div>
      <table>
        <tbody>
        <tr>
          <td>
            good
          </td>
          <td>
            {props.good}
          </td>
        </tr>
        <tr>
          <td>neutral</td>
          <td>{props.neutral}</td>
        </tr>
        <tr>
          <td>bad</td>
          <td>{props.bad}</td>
        </tr>
        <tr>
          <td>average</td>
          <td>{average}</td>
        </tr>
        <tr>
          <td>positive</td>
          <td>{positive} %</td>
        </tr>
        </tbody>
      </table>

    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

  const App = () => {
    const feedback = 'give feedback'
    const stats = 'statistics'
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [all, setAll] = useState(0)
  
    const handleGoodClick = () => {
      setGood(good + 1)
      setAll (all + 1)
    }
    const handleNeutralClick = () => {
      setNeutral(neutral + 1)
      setAll (all + 1)
    }
    const handleBadClick = () => {
      setBad(bad + 1)
      setAll (all + 1)
    }
  
    return (
      <div>
        <Title name={feedback} />

        <Button 
        handleClick={handleGoodClick} 
        text='good'/>
        <Button 
        handleClick={handleNeutralClick} 
        text='neutral'/>
        <Button 
        handleClick={handleBadClick} 
        text='bad'/>

        <Title name={stats} />
        <Statistics good={good} neutral={neutral} bad={bad} all={all} />

      </div>
    )
  }

export default App