import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import Logout from './components/Logout'

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('loggedBlogappUser')
    return saved ? JSON.parse(saved) : null
  })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  const handleLogin = (event) => {
    event.preventDefault()

    loginService.login({ username, password })
      .then((user) => {
        window.localStorage.setItem(
          'loggedBlogappUser',
          JSON.stringify(user)
        )

        setUser(user)
      })
      .catch(() => {
        console.error('wrong credentials')
      })
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  return (
    <div>
      {!user &&
        <LoginForm username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />}
      {user && (
        <div>
          <Logout user={user} handleLogout={handleLogout}/>
          <Blogs blogs={blogs} />
        </div>
      )}
    </div>
  )
}

export default App