import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateBlog, removeBlog, commentBlog } from "../reducers/blogs";
import { useNotification } from "../hooks/useNotification";

const Blog = () => {
  const id = useParams().id;
  const blog = useSelector(({ blogs }) => blogs.find((u) => u.id === id));

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const notifyWith = useNotification();

  const remove = () => {
    const ok = window.confirm(`Sure you want to remove '${blog.title}'`);

    if (ok) {
      dispatch(removeBlog(blog));
      notifyWith(`The blog '${blog.title}' deleted`);
      navigate("/blogs");
    }
  };

  const like = () => {
    const blogToUpdate = { ...blog, likes: blog.likes + 1, user: blog.user.id };
    dispatch(updateBlog(blog.id, blogToUpdate));
    notifyWith(`A like for the blog '${blog.title}' by '${blog.author}'`);
  };

  const addComment = () => {
    dispatch(commentBlog(blog.id, comment));
    notifyWith("Comment added!");
  };

  if (!blog) {
    return null;
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
              onClick={like}
            >
              Like
            </button>
          </div>

          <div className="mb-2 text-muted">Added by {blog.user.name}</div>

          <div className="mt-3">
            <h6>Comments</h6>

            {blog.comments && blog.comments.length > 0 ? (
              <ul className="list-group">
                {blog.comments.map((comment) => (
                  <li key={comment.id} className="list-group-item">
                    {comment.content}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-muted">No comments yet</div>
            )}
          </div>

          <div className="mt-3">
            <button className="btn btn-danger btn-sm" onClick={remove}>
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
