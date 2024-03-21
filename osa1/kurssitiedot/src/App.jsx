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
    <p>Number of exercises {props.one + props.two + props.three}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
      name: 'Fundamentals of React',
      exercises: 10
    }
  const part2 = {
      name: 'Using props to pass data',
      exercises: 7
    }
  const part3 = {
      name: 'State of a component',
      exercises: 14
    }
    const osat = [part1, part2, part3]
  
  
    return (
      <div>
        <Header kurssi={course}/>
        <Content osat={osat}/>
        <Total one={osat[0].exercises} two={osat[1].exercises} three={osat[2].exercises}/>
      </div>
    )
  }

export default App