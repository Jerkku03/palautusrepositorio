import { useState, useEffect, useRef} from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import CreateNew from './components/CreateNew'
import Notification from './components/Notification'
import SuccessNotification from './components/SuccessNotification'
import Togglable from './components/Togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a,b) => b.likes - a.likes) )
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
    
    <Notification message={errorMessage} />
    <SuccessNotification message={successMessage} />

    {!user && <Login username={username} password={password} setUsername={setUsername} setPassword={setPassword} user={user} setUser={setUser} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />}

    {user && <div>
      <p>{user.name} logged in</p>
      </div>} 

    <Togglable buttonLabel="new blog" ref={blogFormRef}>  
    {user && <CreateNew errorMessage={errorMessage} successMessage={successMessage} setSuccessMessage={setSuccessMessage} blogFormRef={blogFormRef} blogService={blogService}/>}
      </Togglable>
    <button onClick={() => {window.localStorage.removeItem('loggedNoteappUser')}}>logout</button>

    {user && blogs.map(blog =>
        <Blog key={user.id} blog={blog} />
      )}

      
    </div>
  )
}

export default App