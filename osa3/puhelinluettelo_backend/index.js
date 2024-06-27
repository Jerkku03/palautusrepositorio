const express = require('express')
const app = express()

app.use(express.json())

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

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const note = notes.find(note => note.id === id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => Number(n.id)))
    : 0
  return String(maxId + 1)
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const note = {
    id: generateId(),
    name: body.name,
    number: body.number,
  }

  notes = notes.concat(note)

  response.json(note)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})