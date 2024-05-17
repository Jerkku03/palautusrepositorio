import { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import noteService from './services/notes'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nimiHaku, setNimiHaku] = useState('')

  useEffect(() => {
    noteService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleNoteChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addNote = (event) => {
    event.preventDefault()

    const noteObject = {
      name: newName,
      number: newNumber
    }

    if (persons.some(p => p.name === newName)){
      if (window.confirm(`${newName} is already added to phonebook, replace old number with new?`)){
        const vanha = persons.find(n => n.name === newName)
        noteService
          .update(vanha.id, noteObject).then(returnedNote => {
            setPersons(persons.map(person => person.id !== vanha.id ? person : returnedNote.data))})
      } return}

    noteService
      .create(noteObject)
      .then(response => {
        setPersons(persons.concat(response.data))
      })
    setNewName('')
    setNewNumber('')
  }

  const delNum = (id) => {
    const poistettava = persons.filter(person => person.id === id)

    if (window.confirm(`haluatko poistaa henkilön ${poistettava[0].name}`)){
      noteService
        .poista(id).then(returnedNote => {
          console.log(returnedNote)
          setPersons(persons.filter(n => n.id !== returnedNote.data.id))
        })
        .catch(error => {
          alert(
            `the person '${poistettava.name}' was already deleted from server`
          )
          setPersons(persons.filter(n => n.id !== id))
        })
      }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={nimiHaku} onChange={(e) => setNimiHaku(e.target.value)} />
      <PersonForm newName={newName} handleNoteChange={handleNoteChange} newNumber={newNumber} handleNumberChange={handleNumberChange} addNote={addNote}/>
      <h2>Numbers</h2>
      <Persons persons={persons} nimiHaku={nimiHaku} del={delNum}/>
    </div>
  )

}

export default App