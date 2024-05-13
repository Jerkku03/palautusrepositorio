import React from "react";

const Persons = ({persons, nimiHaku}) => {
    return (
        <div>
            {persons.filter(nimi => nimi.name.toLowerCase().includes(nimiHaku)).map(nimi => 
            <p key={nimi.name}>{nimi.name} {nimi.number}</p>
            )}
        </div>
      )
}

export default Persons