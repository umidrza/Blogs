import { useState } from "react"

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    createBlog({ title, author, url });

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Create New Blog</h3>

      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="author" className="form-label">
            Author
          </label>
          <input
            type="text"
            id="author"
            className="form-control"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="url" className="form-label">
            URL
          </label>
          <input
            type="text"
            id="url"
            className="form-control"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-success">
          Create Blog
        </button>
      </form>
    </div>
  )
}

export default BlogForm