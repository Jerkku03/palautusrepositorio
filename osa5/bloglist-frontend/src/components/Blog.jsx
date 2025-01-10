import Togglable from "./Togglable"

const Blog = ({ blog }) => (
  <div style={{display: "flex"}}>
    {blog.title}
    <Togglable buttonLabel="view">
      <br />
      {blog.url} <br />
      likes {blog.likes} <button>like</button><br />
      {blog.author} 
      </Togglable>  
  </div>
)

export default Blog