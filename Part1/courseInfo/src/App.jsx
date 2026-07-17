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


  function  Header ({course}) {
    return <h1>{course.name}</h1>
  }
 

const Content = ({course}) => {
  const {name, parts} = course
  return <div>
    {parts.map(part => (
      <p>
        <span>{part.name}</span> <span>{part.exercises}</span>
        </p>
    ))}
  </div>
}
  
function Total ({course}) {
  const {name, parts} = course
  return (
    <div>
      <p>{parts.reduce((sum, part)=> sum + part.exercises, 0)}</p>
    </div>
  )
}


  return (
    <div>
     <Header course={course}/>
     <Content course ={course}/>
     <Total course={course}/>
 
    </div>
  )
}
export default App