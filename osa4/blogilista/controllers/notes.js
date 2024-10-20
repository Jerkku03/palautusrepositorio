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

notesRouter.delete('/:id', async (request, response, next) => {
  const poistettu = await Blog.findByIdAndDelete(request.params.id)
    if (poistettu){
      response.status(204).end()
    } else {
      response.status(404).end()
    }
})

notesRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const note = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    important: body.important,
  }

  const updatedNote = await Blog.findByIdAndUpdate(request.params.id, note, { new: true })
    if (updatedNote){
      response.json(updatedNote)}
    else{
      response.status(404).end()
    }
})

module.exports = notesRouter