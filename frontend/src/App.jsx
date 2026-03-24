import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { initializeUser } from './reducers/userReducer';

import Blogs from './components/Blogs'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable';
import Home from './components/Home'
import Navbar from './components/Navbar'


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);

  return (
    <div className="container mt-4">
      <Navbar />

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
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </div>
  );
}

export default App