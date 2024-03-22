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
      <Display teksti='good ' counter={good}/>
      <Display teksti='neutral 'counter={neutral}/>
      <Display teksti='bad 'counter={bad}/>
    </div>
  )
}

export default App
