import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      <h2>blogs</h2>
      {user && blogs.map(blog =>
        <Blog key={user.id} blog={blog} />
      )}

    {!user && <Login username={username} password={password} setUsername={setUsername} setPassword={setPassword} user={user} setUser={setUser} errorMessage={errorMessage} setErrorMessage={setErrorMessage}/>}

    {user && <div>
      <p>{user.name} logged in</p>
      </div>} 

    <button onClick={window.localStorage.clear()}>logout</button>

      
    </div>
  )
}

export default App