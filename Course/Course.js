import React from "react";

const Course = ({course, total}) => {
  return(
    <div>
      <Header course={course} />
      <div>
        {course.parts.map(part =>
          <Part part={part} />
        )}
    </div>
      <p><strong>Total of {total} exercises</strong></p>
    </div>
  )

}

const Header = ({course}) => {
  return(
    <h1>{course.name}</h1>
  )
}

const Part = ({part}) => {
  return(
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

export default Course;
