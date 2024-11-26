const { test, after, beforeEach } = require('node:test')
const Blog = require('../models/blog')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

// ...

const initialBlogs = [
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0,
        userId:"6745d5ac57560d2cfdab5c10"
      },
      {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0,
        userId:"6745d5ac57560d2cfdab5c10"
      },
      {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0,
        userId:"6745d5ac57560d2cfdab5c10"
      },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  await api
    .post('/api/blog')
    .send(initialBlogs[0])
})
