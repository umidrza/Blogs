import { useState, useEffect } from 'react'
import loginService from "./services/login";
import blogService from "./services/blogs";
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import Logout from './components/LogoutForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState({ message: "", type: "" });

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('loggedBlogappUser')
    return saved ? JSON.parse(saved) : null
  })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
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

      <BlogForm createBlog={addBlog} />
      <Blogs blogs={blogs} />
      <Logout user={user} handleLogout={handleLogout} />
    </div>
  );
}

export default App