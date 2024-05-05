import React from "react";
import Course from "./components/Course.js"

const App = () => {
  const courses = [
    {
    id: 1,
    name: 'Half Stack application development',
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
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      },
    ]
  },
  {
  id: 2,
  name: 'Node.js',
  parts:[
      {
        name: 'Routing',
        exercises: 3,
        id: 1
      },
      {
        name: 'Middlewares',
        exercises: 7,
        id:2
      },
      {
        name: 'Full Stack',
        exercises: 10,
        id: 3
      }
    ]
  }
  ]

  const reducer = (previousValue, currentValue) => {
    return previousValue + currentValue;
  }

  return (
  <div>
    {courses.map(course =>
      <Course course={course} total={course.parts.map(function(arr){return arr.exercises;}).reduce(reducer)} />
      )}
  </div>
  )
}

export default App;