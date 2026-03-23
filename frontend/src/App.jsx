import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import loginService from "./services/login";
import { showNotification } from './reducers/notificationReducer';


import Blogs from './components/Blogs'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable';
import Home from './components/Home'
import Navbar from './components/Navbar'


const App = () => {
  const [user, setUser] = useState(null)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  
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

      dispatch(showNotification(`welcome ${user.name}`, 'success', 3));
    } catch {
      dispatch(showNotification("wrong username or password", "error", 3));
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogUser");
    setUser(null);
    dispatch(showNotification(`Logout ${user.name}`));
    navigate('/login');
  };

  return (
    <div className="container mt-4">
      <Navbar handleLogout={handleLogout}
        user={user}/>

      <Notification />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/blogs"
          element={
            <>
              <Togglable buttonLabel="Create new Blog">
                <BlogForm />
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