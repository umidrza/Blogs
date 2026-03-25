import { addBlog } from "../reducers/blogs";
import { useField } from "../hooks/useField";
import { useNotification } from "../hooks/useNotification";
import { useDispatch } from "react-redux";

const BlogForm = ({ hideMe }) => {
  const title = useField("text");
  const author = useField("text");
  const url = useField("text");

  const dispatch = useDispatch();
  const notify = useNotification();

  const handleSubmit = async (event) => {
    event.preventDefault();

    notify(`A new blog '${title.value}' by '${author.value}' added`);
    dispatch(
      addBlog({
        title: title.value,
        author: author.value,
        url: url.value,
      }),
    );
    hideMe();
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
