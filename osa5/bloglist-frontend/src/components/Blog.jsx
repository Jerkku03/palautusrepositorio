import Togglable from "./Togglable"
import blogService from "../services/blogs"
import { useState } from "react"

const Blog = ({ blog }) => {
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
    blogService.update(blog.id, {id: blog.id, title: blog.title, author: blog.author, url: blog.url, likes: blog.likes += 1})
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
  </div>
  )
}

export default Blog