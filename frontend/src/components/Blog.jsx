import { useState } from "react"
import blogService from '../services/blogs'
import { useParams, useNavigate } from 'react-router-dom'

const Blog = ({ blogs, setBlogs }) => {
  const [visible, setVisible] = useState(false)
  const { id } = useParams();
  const navigate = useNavigate()
  const blog = blogs.find(blog => blog.id === id)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = async () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id
    }

    const returnedBlog = await blogService.update(blog.id, updatedBlog)
    updateBlogInState(returnedBlog)
  }

  const handleDelete = async () => {
    if (confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.remove(blog.id);
      deleteBlogInState(blog.id);
      navigate('/blogs')
    }
  }

  const updateBlogInState = (updatedBlog) => {
    setBlogs(blogs.map(blog =>
      blog.id === updatedBlog.id
        ? { ...updatedBlog, user: blog.user }
        : blog
    ))
  }

  const deleteBlogInState = (blogId) => {
    setBlogs(blogs.filter(blog => blog.id !== blogId))
  }

  if (!blog) {
    return <div>Loading...</div>
  }

  return (
    <div className="blog" style={blogStyle}>
      <div>
        {blog.title} by {blog.author}
        <button onClick={toggleVisibility}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>

      {visible && (
        <div>
          <div>{blog.url}</div>
          <div>
            {blog.likes} likes
            <button onClick={handleLike}>like</button>
          </div>
          <div>{blog.user.name}</div>
          <div>
            <button onClick={handleDelete}>remove</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Blog