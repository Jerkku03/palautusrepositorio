import { useState } from 'react'

const Course = (props) => {
  const kaikki = props.course.parts.map(kurssi => <li key={kurssi.id}>{kurssi.name} {kurssi.exercises}</li>)
  const kaik = props.course.parts.reduce((aiempi, nyk) => aiempi + nyk.exercises, 0)
  return (
    <div>
      <h1>{props.course.name}</h1>
      <ul>
        {kaikki}
      </ul>
      total of {kaik} excercises
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App
