const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('../tests/test_helper')
const api = supertest(app)
const Blog = require('../models/blog')



beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[2])
  await blogObject.save()
})

test('notes are returned as json', async () => {
  await api
    .get('/api/blog')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('right amount of blogs', async () => {
  const response = await api.get('/api/blog')

  assert.deepStrictEqual(response.body.length, helper.initialBlogs.length)
})

test('blogs can be added', async () => {
  const newBlog = {
    _id: "5a422b3a1b54a676234d17f1",
    title: "anonical string reduction",
    author: "dsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 11,
    __v: 0
  }

  await api
    .post('/api/blog')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  const response = await api.get('/api/blog')

  assert.deepStrictEqual(response.body.length, helper.initialBlogs.length + 1)
})

test('likes without value', async () => {
  const response = await api.get('/api/blog')

  if ('likes' != helper.initialBlogs.body){response.body.likes == 0}
})

test('id is right format', async () => {
  const response = await api.get('/api/blog')

  if ('id' in response.body){return true}
  false
})

test.only('not include title or url', async () => {
  const newBlog = {
    author: "dsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 11,
    __v: 0
  }

  await api
    .post('/api/blog')
    .send(newBlog)
    .expect(400)
})


after(async () => {
  await mongoose.connection.close()
})