import { useState } from 'react'
import blogService from '../services/blogs'

const Cratenew = ({ setErrorMessage, successMessage, setSuccessMessage, blogFormRef, blogService, blogs, setBlogs, username}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleBlog = async (event) => {
    setSuccessMessage(`a new blog ${title} by ${author} added`)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 4000)
    event.preventDefault()
    try {
      blogService.create({ title, author, url })
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    setBlogs([...blogs , {title: title, author: author, url: url, likes:0, user: {username: username}}])
    setTitle('')
    setAuthor('')
    setUrl('')
    blogFormRef.current.toggleVisibility()
  }
  return (
    <>
      <h3>create new</h3>
      <form onSubmit={handleBlog}>
        <div>
          title:
          <input
            data-testid='title'
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            data-testid='blogAuthor'
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            data-testid='blogUrl'
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default Cratenew