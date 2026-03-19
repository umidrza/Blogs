import { useState } from "react"
import blogService from '../services/blogs'

const Blog = ({ blog, updateBlogInState, deleteBlogInState }) => {
  const [visible, setVisible] = useState(false)

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
    }
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