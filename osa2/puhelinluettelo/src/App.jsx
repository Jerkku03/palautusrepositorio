import { useEffect, useState } from 'react'



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
      <div>
      filter shown with<input value={nimiHaku} onChange={(e) => setNimiHaku(e.target.value)} />
      </div>
      <form>
        <h2>add a new</h2>
        <div>
          name: <input value={newName} onChange={handleNoteChange}/>
          <br />
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit" onClick={addNote}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.filter(nimi => nimi.name.toLowerCase().includes(nimiHaku)).map(nimi => 
        <p key={nimi.name}>{nimi.name} {nimi.number}</p>
      )}
    </div>
  )

}

export default App