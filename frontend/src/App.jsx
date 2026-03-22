import { useState, useEffect, useRef } from 'react'
import loginService from "./services/login";
import useResource from './hooks/useResource'

import Blogs from './components/Blogs'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Logout from './components/LogoutForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable';
import Home from './components/Home'

import {
  Routes, Route, Link,
  useNavigate
} from 'react-router-dom'

const App = () => {
  const [blogs, blogService] = useResource('/api/blogs');
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()
  const navigate = useNavigate()

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials);

      window.localStorage.setItem(
        "loggedBlogUser",
        JSON.stringify(user)
      );
      setUser(user);

      showNotification(`welcome ${user.name}`);
    } catch {
      showNotification("wrong username or password", "error");
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogUser");
    setUser(null);
    showNotification(`Logout ${user.name}`);
    navigate('/login')
  };

  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject);

      blogFormRef.current.toggleVisibility()
      showNotification(
        `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
      );
      navigate(`blogs/${returnedBlog.id}`)
    } catch {
      showNotification("failed to add blog", "error");
    }
  };

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });

    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const padding = {
    padding: 5
  }

  return (
    <div>
      <div>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/blogs">blogs</Link>

        {user
          ? <em>{user.name} <Logout handleLogout={handleLogout} /></em>
          : <Link style={padding} to="/login">login</Link>
        }
      </div>

      <Notification
        message={notification?.message}
        type={notification?.type}
      />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/blogs" element={(
          <>
            <Togglable buttonLabel="Create new Blog" ref={blogFormRef}>
              <BlogForm createBlog={addBlog} />
            </Togglable>
            <Blogs />
          </>
        )} />

        <Route path="/blogs/:id" element={
          <Blog/>
        } />

        <Route path="/login" element={
          <LoginForm handleLogin={handleLogin} />
        } />

      </Routes>
    </div>
  );
}

export default App