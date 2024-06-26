const express = require('express')
const app = express()

let notes = [
    {
      id: "1",
      name: "Arto hellas",
      number: '040-123456'
    },
    {
      id: "2",
      name: "Ada Lovelace",
      number: '39-44-5323523'
    },
    {
      id: "3",
      name: "Dan Abramov",
      number: '12-43-2345'
    },
    {
        id: "4",
        name: "Mary Poppendick",
        number: '39-23-6456'
      }
  ]

app.get('/api/persons', (request, response) => {
  response.send(notes)
})

app.get('/info', (request, response) => {
    peopleAmount = notes.length
    const date = new Date()
    tied = `Phonebook has info for ${peopleAmount} people`
    aika = `${date.toDateString()}`

  response.send(`<p> ${tied} <p> <p> ${aika} ${date.toTimeString()}<p>`)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})