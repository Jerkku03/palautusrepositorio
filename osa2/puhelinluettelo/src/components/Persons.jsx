import React from "react";

const Persons = ({persons, nimiHaku, del}) => {
    return (
        <div>
            {persons.filter(nimi => nimi.name.toLowerCase().includes(nimiHaku)).map(nimi => 
            <p key={nimi.name}>{nimi.name} {nimi.number} <button onClick={(()=> del(nimi.id))}>delete</button></p>
            )}
        </div>
      )
}

export default Persons