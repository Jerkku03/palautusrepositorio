const notesRouter = require('express').Router()
const Blog = require('../models/blog')
require('express-async-errors')

notesRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user',{ username: 1, name: 1, id: 1 })
	  response.json(blogs)
})

notesRouter.get('/:id', async (request, response, next) => {
  const note = await Blog.findById(request.params.id)
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
})

notesRouter.post('/', (request, response, next) => {
  const body = request.body

  if (body.title == undefined || body.url == undefined){
    response.status(400)
    .catch(error => next(error))
    return 
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })

  blog.save()
    .then(savedNote => {
      response.status(201).json(savedNote)
    })
    .catch(error => next(error))
})

notesRouter.delete('/:id', (request, response, next) => {
  Blog.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

notesRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const note = {
    content: body.content,
    important: body.important,
  }

  Blog.findByIdAndUpdate(request.params.id, note, { new: true })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

module.exports = notesRouter