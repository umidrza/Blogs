import { useState } from "react"
import useResource from '../hooks/useResource'
import { useParams, useNavigate } from 'react-router-dom'

const Blog = () => {
  const [blogs, blogService] = useResource('/api/blogs');
  const [visible, setVisible] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const blog = blogs.find(blog => blog.id === id)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = async () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id
    }

    await blogService.update(blog.id, updatedBlog);
  }

  const handleDelete = async () => {
    if (confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.remove(blog.id);
      navigate('/blogs')
    }
  }

  if (!blog) {
    return <div>Loading...</div>
  }

  return (
    <div className="blog card mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <strong>{blog.title}</strong> by {blog.author}
          </div>
          <button
            className="btn btn-primary btn-sm"
            onClick={toggleVisibility}
          >
            {visible ? 'Hide' : 'View'}
          </button>
        </div>

        {visible && (
          <div className="mt-3">
            <div className="mb-2">
              <a href={blog.url} target="_blank" rel="noreferrer">
                {blog.url}
              </a>
            </div>

            <div className="mb-2 d-flex align-items-center gap-2">
              <span>{blog.likes} likes</span>
              <button
                className="btn btn-outline-success btn-sm"
                onClick={handleLike}
              >
                Like
              </button>
            </div>

            <div className="mb-2 text-muted">
              Added by {blog.user.name}
            </div>

            <div>
              <button
                className="btn btn-danger btn-sm"
                onClick={handleDelete}
              >
                Remove
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Blog