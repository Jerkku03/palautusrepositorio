const Header = (props) => {
  return (
    <div>
      <h1>{props.kurssi}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercise}
    </p>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.osat[0].name} exercise={props.osat[0].exercises}/>
      <Part part={props.osat[1].name} exercise={props.osat[1].exercises}/>
      <Part part={props.osat[2].name} exercise={props.osat[2].exercises}/>
    </div>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.osat[0].exercises + props.osat[1].exercises + props.osat[2].exercises}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  
    return (
      <div>
        <Header kurssi={course.name}/>
        <Content osat={course.parts}/>
        <Total osat={course.parts}/>
      </div>
    )
  }

export default App