import Togglable from "./Togglable"
import blogService from "../services/blogs"

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
  return (
  <div style={blogStyle}>
    {blog.title}
    <Togglable buttonLabel="view">
      <br />
      {blog.url} <br />
      likes {blog.likes} <button onClick={() => blogService.update(blog.id, {id: blog.id, title: blog.title, author: blog.author, url: blog.url, likes: blog.likes += 1})}>like</button><br />
      {blog.author} 
      </Togglable>  
  </div>
  )
}

export default Blog