import { Link } from "react-router-dom"
import { fetchBlogs } from '../reducers/blogsReducer'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";

const Blogs = () => {
  const blogs = useSelector(state => state.blogs)
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(fetchBlogs())
    }, [dispatch])
  
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