import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showNotification } from "../reducers/notificationReducer";
import { fetchBlogs, updateBlog, deleteBlog } from "../reducers/blogsReducer";
import { useEffect } from "react";

const Blog = () => {
  const blogs = useSelector((state) => state.blogs);
  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const blog = blogs.find((blog) => blog.id === id);

  const handleLike = async () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    };

    dispatch(updateBlog({ id: blog.id, updatedBlog }));
    dispatch(showNotification(`Liked ${blog.title}`, "success", 2));
  };

  const handleDelete = async () => {
    if (!confirm(`Remove blog ${blog.title} by ${blog.author}`)) return;

    dispatch(deleteBlog(blog.id));
    navigate("/blogs");
    dispatch(showNotification(`Deleted ${blog.title}`, "success", 2));
  };

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div className="blog card mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <strong>{blog.title}</strong> by {blog.author}
          </div>
        </div>

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

          <div className="mb-2 text-muted">Added by {blog.user.name}</div>

          <div>
            <button className="btn btn-danger btn-sm" onClick={handleDelete}>
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
