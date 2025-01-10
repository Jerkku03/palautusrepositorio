import Togglable from './Togglable'
import blogService from '../services/blogs'
import { useState } from 'react'

const Blog = ({ blog , user }) => {
  const [likes, setLikes] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const Like = () => {
    setLikes(likes + 1)
    blogService.update(blog.id, { id: blog.id, title: blog.title, author: blog.author, url: blog.url, likes: blog.likes += 1 })
  }

  const Poista = () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}`)){
      blogService.poista(blog.id)
    }
    window.location.reload()

  }

  return (
    <div style={blogStyle}>
      {blog.title}
      <Togglable buttonLabel="view">
        <br />
        {blog.url} <br />
      likes {likes} <button onClick={() => Like()}>like</button><br />
        {blog.author}
      </Togglable>
      {blog.user.username === user.username && (
        <button onClick={() => Poista()}>delete</button>
      )}
    </div>
  )
}

export default Blog