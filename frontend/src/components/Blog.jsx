import { useState } from "react"
import useResource from '../hooks/useResource'
import { useParams, useNavigate } from 'react-router-dom'

const Blog = () => {
  const [blogs, blogService] = useResource('/api/blogs');
  const [visible, setVisible] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

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