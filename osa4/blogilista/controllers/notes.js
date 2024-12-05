const mongoose = require('mongoose')
const notesRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
require('express-async-errors')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

notesRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', {username: 1})
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

notesRouter.post('/', async (request, response, next) => {
  const body = request.body

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  if (body.title == undefined || body.url == undefined){
    response.status(400)
    .catch(error => next(error))
    return 
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })
  
const savedNote = await blog.save()
  user.blogs = user.blogs.concat(savedNote._id)
  await user.save()
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