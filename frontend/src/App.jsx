import { useState, useEffect, useRef } from 'react'
import loginService from "./services/login";
import blogService from "./services/blogs";
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import Logout from './components/LogoutForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState({ message: "", type: "" });

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('loggedBlogUser')
    return saved ? JSON.parse(saved) : null
  })

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      const sortedBlogs = blogs.sort((b1, b2) => b2.likes - b1.likes);
      setBlogs(sortedBlogs);
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials);

      window.localStorage.setItem(
        "loggedBlogUser",
        JSON.stringify(user)
      );

      blogService.setToken(user.token);
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
  };

  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(returnedBlog));

      blogFormRef.current.toggleVisibility()
      showNotification(
        `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
      );
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


  if (user === null) {
    return (
      <div>
        <Notification
          message={notification?.message}
          type={notification?.type}
        />
        <LoginForm handleLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div>
      <Notification
        message={notification?.message}
        type={notification?.type}
      />

      <Togglable buttonLabel="Create new Blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>

      <Blogs blogs={blogs} setBlogs={setBlogs} />
      <Logout user={user} handleLogout={handleLogout} />
    </div>
  );
}

export default App