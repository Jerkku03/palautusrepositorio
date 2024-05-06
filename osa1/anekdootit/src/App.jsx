import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
  

  const Klikki = () => {
    setSelected(Math.floor(Math.random()*7))
  }

  const Button = () => {
    return (
      <button onClick={Klikki}>next anecdote</button>
    )
  }

  const Lisaa = () => {
    const uudetPist = [...points]
    uudetPist[selected] += 1
    setPoints(uudetPist)
  }

  const Aanesta = () => {
    return (
      <button onClick={Lisaa}>vote</button>
    )
  }

  const [selected, setSelected] = useState(0)

  
  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0, 0])

  const eniten = points.indexOf(Math.max(...points))

  console.log(points)

  return (
    <div>
      {anecdotes[selected]}
      <br/>
      has {points[selected]} votes
      <br />
      <Aanesta/>
      <Button/>
      <h1>Anecdote with most votes</h1>
      {anecdotes[eniten]}
    </div>
  )
}

export default App
