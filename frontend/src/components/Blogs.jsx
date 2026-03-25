import { Link } from "react-router-dom"
import { useSelector } from 'react-redux';

const Blogs = () => {
  const byLikes = (b1, b2) => b2.likes - b1.likes
  const blogs = useSelector(({ blogs }) => [...blogs].sort(byLikes))

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Blogs</h2>

      <div className="list-group">
        {blogs.map(blog => (
          <Link
            key={blog.id}
            to={`/blogs/${blog.id}`}
            className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
          >
            <div>
              <strong>{blog.title}</strong> by {blog.author}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Blogs