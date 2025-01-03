import loginService from '../services/login'

const Login = ({username, setUsername, password, setPassword, setUser, setErrorMessage}) => {
    const handleLogin = async (event) => {
        event.preventDefault()
        console.log('logging in with', username, password)

        try {
            const user = await loginService.login({
              username, password,
            })
            window.localStorage.setItem(
              'loggedNoteappUser', JSON.stringify(user)
            ) 
            setUser(user)
            setUsername('')
            setPassword('')
          } catch (exception) {
            setErrorMessage('wrong credentials')
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          }
      }

    return (
        <>
        <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
      </>
    )
} 

export default Login