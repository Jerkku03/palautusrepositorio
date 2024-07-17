const express = require('express')
var morgan = require('morgan')
const app = express()
const cors = require('cors')
require('dotenv').config();
const Person = require('./models/person')


app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
morgan.token('body', (request) => JSON.stringify(request.body))

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
      response.json(persons.map(person => person.toJSON()))
      })
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
  const min = notes.length > 0
  const max = 150
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return String(Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled))
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  const personName = body.name
  const personNumber = body.number

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const person = new Person ({
    name: personName,
    number: personNumber
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
  
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})