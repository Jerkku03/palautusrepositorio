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
    Person.find({}).then(persons => {
      peopleAmount = persons.length
    })
    const date = new Date()
    tied = `Phonebook has info for ${peopleAmount} people`
    aika = `${date.toDateString()}`

  response.send(`<p> ${tied} <p> <p> ${aika} ${date.toTimeString()}<p>`)
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
        if (person) {
            response.json(person.toJSON())
          } else {
            response.status(404).end()
          }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

const generateId = () => {
  const min = notes.length > 0
  const max = 150
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return String(Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled))
}

app.post('/api/persons', (request, response, next) => {
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

  .catch(error => next(error))
  
})

app.put('/api/persons/:id', (request, response, next) =>{
  const body = request.body

    const person = {
      name: body.name,
      number: body.number,
    }

    Person.findByIdAndUpdate(request.params.id, person, { new: true })
      .then(updatedPerson => {
        response.json(updatedPerson)
      })
      .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
    else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    }

  next(error)
}

app.use(errorHandler)

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// olemattomien osoitteiden käsittely
app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})