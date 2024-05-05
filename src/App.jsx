import { useState, useEffect } from 'react'
import Person from './components/Person'
import ErrorMessage from './components/ErrorMessage'
import SuccessMessage from './components/SuccessMessage'
import phoneBookService from './services/phonebook'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    phoneBookService
      .getAll()
      .then(allPersons => {
        setPersons(allPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    let foundPerson = persons.find(person => person.name === newName)

    if(foundPerson){

      if(window.confirm(`${foundPerson.name} is already added to the phone book, replace the old number with the new one?`)){
        
        const changedPerson = {... foundPerson, number: newNumber}
        phoneBookService
        .update(foundPerson.id, changedPerson)
        .then(returnedPerson => {

          setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
          setSuccessMessage(`${returnedPerson.name} was updated!`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)

        }).catch(error => {

          setErrorMessage(
            `${foundPerson.name} was already deleted from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)

          setPersons(persons.filter(n => n.id !== foundPerson.id))
        })

      }

    } else {

      phoneBookService
        .create(personObject)
        .then(addedPerson =>{

          setPersons(persons.concat(addedPerson))
          setNewName('')
          setNewNumber('')
          setSuccessMessage(`${addedPerson.name} was added successfully!`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)

        })

    }

  }

  const removePerson = (id, name) => {
    if(window.confirm(`Delete ${name}?`)){
      phoneBookService
      .removePerson(id)
      .then(() =>{

        setPersons(persons.filter(n => n.id !== id))
        setSuccessMessage(`${name} was removed successfully!`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)

    }).catch(error => {

      setErrorMessage(
        `${name} was already deleted from server`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

      setPersons(persons.filter(n => n.id !== id))
    })
  }
    
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <ErrorMessage message={errorMessage}/>
      <SuccessMessage message={successMessage}/>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
       {persons.map(person =>
        <Person
        key={person.id}
        name={person.name}
        number={person.number}
        removePerson={() => removePerson(person.id, person.name)}
        />
        )}
    </div>
  )
}

export default App