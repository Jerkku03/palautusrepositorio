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

const All = (props) => {
  return (
    <div>all {props.eka + props.toka + props.kolmas}</div>
  )
}

const Average = (props) => {
  if (props.eka > 0){
    return (
      <div>average {(props.eka - props.kolmas)/(props.eka + props.toka + props.kolmas)}</div>
  )
  }
  return (
    <div>average 0</div>
  )
}

const Positive = (props) => {
  if (props.eka > 0){
    return (
      <div>positive {(props.eka / (props.eka + props.toka + props.kolmas))*100} %</div>
    )
  }
  return (
    <div>positive 0</div>
  )
}

const Statistics = (props) => {
    let good = props.good
    let neutral = props.neutral
    let bad = props.bad
  return (
    <div>
      <Display teksti='good ' counter={good}/>
      <Display teksti='neutral 'counter={neutral}/>
      <Display teksti='bad 'counter={bad}/>
      <All eka={good} toka={neutral} kolmas={bad}/>
      <Average eka={good} toka={neutral} kolmas={bad}/>
      <Positive eka={good} toka={neutral} kolmas={bad}/>
    </div>
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
      <button onClick={()=> setGood(good +1)}>good</button>
      <button onClick={()=> setNeutral(neutral+1)}>neutral</button>
      <button onClick={()=> setBad(bad+1)}>bad</button>
      <Header otsikko={ala_otsik}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
