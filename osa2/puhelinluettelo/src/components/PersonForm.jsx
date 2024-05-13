import React from "react";

const PersonForm = ({newName, handleNoteChange, newNumber, handleNumberChange, addNote}) => {
     return (   
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
    )
}

export default PersonForm