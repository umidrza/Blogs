import { Link } from "react-router-dom"

const Blogs = ({ blogs }) => {
  return (
    <div>
      <h2>Blogs</h2>
      {blogs.map(blog =>
      <Link key={blog.id} to={`/blogs/${blog.id}`}>
        <div>{blog.title} by {blog.author}</div>
      </Link>
      )}
    </div>
  )
}

export default Blogs