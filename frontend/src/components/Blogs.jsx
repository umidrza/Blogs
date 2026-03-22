import { Link } from "react-router-dom"
import useResource from "../hooks/useResource"

const Blogs = () => {
  const [blogs, blogService] = useResource('/api/blogs')
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
  return (
    <div>
      <h2>Blogs</h2>
      {sortedBlogs.map(blog =>
      <Link key={blog.id} to={`/blogs/${blog.id}`}>
        <div>{blog.title} by {blog.author}</div>
      </Link>
      )}
    </div>
  )
}

export default Blogs