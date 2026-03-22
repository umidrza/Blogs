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
    <div className="container mt-4">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4 rounded shadow-sm p-3">
        <div className="container-fluid d-flex justify-content-between">
          <div className="d-flex gap-3">
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/blogs">Blogs</Link>
          </div>

          <div>
            {user ? (
              <span className="navbar-text">
                <em>
                  {user.name} <Logout handleLogout={handleLogout} />
                </em>
              </span>
            ) : (
              <Link className="nav-link" to="/login">Login</Link>
            )}
          </div>
        </div>
      </nav>

      {/* Notification */}
      <Notification
        message={notification?.message}
        type={notification?.type}
      />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/blogs"
          element={
            <>
              <Togglable buttonLabel="Create new Blog" ref={blogFormRef}>
                <BlogForm createBlog={addBlog} />
              </Togglable>
              <Blogs />
            </>
          }
        />

        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/login" element={<LoginForm handleLogin={handleLogin} />} />
      </Routes>
    </div>
  );
}

export default App