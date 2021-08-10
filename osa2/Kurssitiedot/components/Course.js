import React from 'react'

const Course = ({course}) => {
    console.log(course, 'kurssi')
    return(
      <div>
        <Header title={course.name}/>
        {course.parts.map(course =>
          <Part key={course.id} name={course.name} exercises={course.exercises}/>)}
        <Total parts={course.parts} />
      </div>
    )
  }

  const Header = (props) => {
      return (
          <h1>
            {props.title}
          </h1>
      )
    }
  
    const Part = ({name, exercises}) => {
      console.log(name, 'name')
      return (
        <div>
     <p>{name} {exercises}</p>
        </div>
      )
    }
  
    const Total = ({parts}) => {
      console.log(parts, 'parts in total')
      const total = parts.reduce((sum, parts) => sum + parts.exercises, 0)
      console.log(total)
      return (
        <div>
          <p>
           <b>total of {total} exercises</b>
          </p>
        </div>
      )
    }
  

export default Course