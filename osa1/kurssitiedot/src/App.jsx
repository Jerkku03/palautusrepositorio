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
      <Part part={props.osat[0].part} exercise={props.osat[0].exercises}/>
      <Part part={props.osat[1].part} exercise={props.osat[1].exercises}/>
      <Part part={props.osat[2].part} exercise={props.osat[2].exercises}/>
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
  const osat = [
    {part: 'Fundamentals of React', exercises: 10},
    {part: 'Using props to pass data', exercises: 7},
    {part: 'State of a component', exercises: 14}
  ]
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header kurssi={course}/>
      
      <Content osat = {osat}/>
  
      <Total one = {exercises1} two = {exercises2} three = {exercises3}/>
    </div>
  )
}

export default App