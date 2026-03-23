import { createBlog } from "../reducers/blogsReducer";
import { useField } from "../hooks/useField";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showNotification } from "../reducers/notificationReducer";

const BlogForm = () => {
  const { reset: resetTitle, ...title } = useField("text");
  const { reset: resetAuthor, ...author } = useField("text");
  const { reset: resetUrl, ...url } = useField("text");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    addBlog({
      title: title.value,
      author: author.value,
      url: url.value,
    });

    resetInputs();
  };

  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await dispatch(createBlog(blogObject)).unwrap();

      navigate(`blogs/${returnedBlog.id}`);
      dispatch(
        showNotification(
          `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
        ),
      );
    } catch {
      dispatch(showNotification("failed to add blog", "error"));
    }
  };

  const resetInputs = () => {
    resetTitle();
    resetAuthor();
    resetUrl();
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Create New Blog</h3>

      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input id="title" className="form-control" {...title} />
        </div>

        <div className="mb-3">
          <label htmlFor="author" className="form-label">
            Author
          </label>
          <input id="author" className="form-control" {...author} />
        </div>

        <div className="mb-3">
          <label htmlFor="url" className="form-label">
            URL
          </label>
          <input id="url" className="form-control" {...url} />
        </div>

        <button type="submit" className="btn btn-success">
          Create Blog
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
