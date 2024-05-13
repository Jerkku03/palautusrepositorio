import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nimiHaku, setNimiHaku] = useState('')

  const handleNoteChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }



  const addNote = (event) => {
    event.preventDefault()
    if (persons.some(p => p.name === newName)){
      alert(`${newName} is already added to phonebook`)
      return
    }
    const noteObject = {
      name: newName,
      number: newNumber
    }
    
    setPersons(persons.concat(noteObject))
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={nimiHaku} onChange={(e) => setNimiHaku(e.target.value)} />
      <PersonForm newName={newName} handleNoteChange={handleNoteChange} newNumber={newNumber} handleNumberChange={handleNumberChange} addNote={addNote}/>
      <h2>Numbers</h2>
      <Persons persons={persons} nimiHaku={nimiHaku}/>
    </div>
  )

}

export default App