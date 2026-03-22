import { Link } from "react-router-dom"
import useResource from "../hooks/useResource"

const Blogs = () => {
  const [blogs, blogService] = useResource('/api/blogs')
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
  
  return (
    <div className="container mt-4">
      <h2 className="mb-3">Blogs</h2>

      <div className="list-group">
        {sortedBlogs.map(blog => (
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