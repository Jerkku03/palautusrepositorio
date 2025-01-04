import blogService from '../services/blogs'

const Cratenew = ({title, setTitle, author, setAuthor, url, setUrl, setErrorMessage, successMessage, setSuccessMessage}) => {
    const handleBlog = async (event) =>{
        setSuccessMessage(`a new blog ${title} by ${author} added`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 4000)
        event.preventDefault()
        try {
            const blog = await blogService.create({title, author, url})
        setTitle('')
        setAuthor('')
        setUrl('')
        }
        catch (exception) {
            setErrorMessage('wrong credentials')
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          }
        }
    return (
        <>
        <h3>create new</h3>
        <form onSubmit={handleBlog}>
        <div>
          title:
            <input
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
            <input
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
            <input
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