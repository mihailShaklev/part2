const Person = ({name, number, removePerson}) => {
  return(
    <div>{name} - {number}<button onClick={removePerson}>Delete</button></div>
  )
}

export default Person