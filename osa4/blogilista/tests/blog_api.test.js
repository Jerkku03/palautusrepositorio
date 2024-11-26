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
  const newBlog = {
    author: "dsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 11,
    __v: 0,
    userId:"6745d5ac57560d2cfdab5c10"
  }

  await api
    .post('/api/blog')
    .send(newBlog)
    .expect(201)

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

test.only('blogs can be added', async () => {
  const newBlog = {
    title: "anonical string reduction",
    author: "dsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 11,
    __v: 0,
    userId:"6745d5ac57560d2cfdab5c10"
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

test('not include title or url', async () => {
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

test('delete blog', async () => {

  await api
    .delete('/api/blog/5a422a851b54a676234d17f7')
    .expect(204)
})

test('muokkaa blogia', async () => {
  const newBlog = {
    id: "5a422a851b54a676234d17f7",
    title: "jj patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 5
  }

  await api
    .put('/api/blog/5a422a851b54a676234d17f7')
    .send(newBlog)
    .expect(newBlog)
})


after(async () => {
  await mongoose.connection.close()
})