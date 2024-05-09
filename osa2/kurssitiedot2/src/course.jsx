import React from "react"

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

export default Course