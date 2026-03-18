import { useState } from "react"

const BlogForm = ({createBlog}) => {
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
    <div>
      <h3>Create new Blog</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
        </div>
        <div>
          <label htmlFor="author">Author</label>
          <input type="text" id="author" value={author} onChange={(e) => setAuthor(e.target.value)}/>
        </div>
        <div>
          <label htmlFor="url">Url</label>
          <input type="text" id="url" value={url} onChange={(e) => setUrl(e.target.value)}/>
        </div>
        <div>
          <button type="submit">Create Blog</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm