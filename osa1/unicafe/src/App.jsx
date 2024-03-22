import { useState } from 'react'

const Display = (props) => {
  return (
    <div>{props.teksti}{props.counter}</div>
  )
}

const Header = (props) => {
  return (
    <div>
      <h1>{props.otsikko}</h1>
    </div>
  )
}

const All = (eka, toka, kolmas) => {
  return (
    eka + toka + kolmas
  )
}

const Average = (eka, toka, kolmas) => {
  if (eka > 0){
    return (
      (eka - kolmas)/(eka + toka + kolmas)
  )
  }
  return (
    0
  )
}

const Positive = (eka, toka, kolmas) => {
  if (eka > 0){
    return (
      (eka / (eka + toka + kolmas))*100
    )
  }
  return (
    0
  )
}
const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.teksti}</td>
      <td>{props.counter}</td>
    </tr>
  )
}

const Statistics = (props) => {
    let good = props.good
    let neutral = props.neutral
    let bad = props.bad
    let all = All(good, neutral, bad)

    if (good > 0){
      return (
        <table>
          <tbody>
            <StatisticLine teksti='good ' counter={good}/>
            <StatisticLine teksti='neutral 'counter={neutral}/>
            <StatisticLine teksti='bad 'counter={bad}/>
            <StatisticLine teksti='all ' counter={all}/>
            <StatisticLine teksti='average ' counter={Average(good, neutral, bad)}/>
            <StatisticLine teksti='positive ' counter={Positive(good, neutral,bad) + '%'}/>
          </tbody>
          </table>
      )
    }
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
}

const Button = (props) => {
  return (
    <button onClick={()=> props.lisays(props.arvo +1)}>{props.nimi}</button>
  )
} 

const App = () => {
  const otsikko = 'give feedback'
  const ala_otsik = 'statistics'
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header otsikko={otsikko}/>
      <Button lisays={setGood} arvo={good} nimi={'good'}/>
      <Button lisays={setNeutral} arvo={neutral} nimi={'neutral'}/>
      <Button lisays={setBad} arvo={bad} nimi={'bad'}/>
      <Header otsikko={ala_otsik}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
