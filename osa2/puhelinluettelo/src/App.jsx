import { useState } from 'react'



const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const addNote = (event) => {
    event.preventDefault()
    if (persons.some(p => p.name === newName)){
      alert(`${newName} is already added to phonebook`)
      return
    }
    const noteObject = {
      name: newName
    }
  
    setPersons(persons.concat(noteObject))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNoteChange}/>
        </div>
        <div>
          <button type="submit" onClick={addNote}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(nimi => 
        <p key={nimi.name}>{nimi.name}</p>
      )}
    </div>
  )

}

export default App