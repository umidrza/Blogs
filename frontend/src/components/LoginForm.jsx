
const LoginForm = ({username, password, setUsername, setPassword, handleLogin}) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">username</label>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input type="text" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm