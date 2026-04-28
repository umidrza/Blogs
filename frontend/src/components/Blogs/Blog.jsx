import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateBlog, removeBlog, commentBlog } from "../../reducers/blogs";
import { useNotification } from "../../hooks/useNotification";
import { useState } from "react";

const Blog = () => {
  const id = useParams().id;
  const blog = useSelector(({ blogs }) => blogs.find((u) => u.id === id));
  const [comment, setComment] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const notifyWith = useNotification();

  const remove = async () => {
    const ok = window.confirm(`Sure you want to remove '${blog.title}'`);

    if (ok) {
      try {
        await dispatch(removeBlog(blog));
        notifyWith(`The blog '${blog.title}' deleted`, "success");
        navigate("/blogs");
      } catch (error) {
        const errorMessage = error.error || error.message || "Failed to delete blog";
        notifyWith(errorMessage, "error");
      }
    }
  };

  const like = async () => {
    try {
      const blogToUpdate = { ...blog, likes: blog.likes + 1, user: blog.user.id };
      await dispatch(updateBlog(blog.id, blogToUpdate));
      notifyWith(`A like for the blog '${blog.title}' by '${blog.author}'`, "success");
    } catch (error) {
      const errorMessage = error.error || error.message || "Failed to like blog";
      notifyWith(errorMessage, "error");
    }
  };

  const addComment = async () => {
    if (!comment.trim()) {
      notifyWith("Comment cannot be empty", "error");
      return;
    }
    try {
      await dispatch(commentBlog(blog.id, comment));
      notifyWith("Comment added!", "success");
      setComment("");
    } catch (error) {
      const errorMessage = error.error || error.message || "Failed to add comment";
      notifyWith(errorMessage, "error");
    }
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

          <div className="mt-3 mb-3">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Add a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                className="btn btn-primary"
                type="button"
                onClick={addComment}
              >
                Comment
              </button>
            </div>
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
