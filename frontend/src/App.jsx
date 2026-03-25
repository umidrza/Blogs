import { useEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import { useInitialization } from "./hooks/useInitialization";

import Blogs from "./components/Blogs";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import LogoutForm from "./components/LogoutForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Users from "./components/Users";
import User from "./components/User";

const App = () => {
  const stateInitializer = useInitialization();

  useEffect(() => {
    stateInitializer();
  }, []);

  const blogFormRef = useRef();

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
              <Togglable buttonLabel="Create new Blog" ref={blogFormRef}>
                <BlogForm
                  hideMe={() => blogFormRef.current.toggleVisibility()}
                />
              </Togglable>

              <Blogs />
            </>
          }
        />

        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/logout" element={<LogoutForm />} />
      </Routes>
    </div>
  );
};

export default App;
