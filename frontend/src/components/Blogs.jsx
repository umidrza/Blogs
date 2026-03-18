import Blog from "./Blog"

const Blogs = ({ blogs, setBlogs }) => {
  const updateBlogInState = (updatedBlog) => {
    setBlogs(blogs.map(blog =>
      blog.id === updatedBlog.id
        ? { ...updatedBlog, user: blog.user }
        : blog
    ))
  }

  const deleteBlogInState = (blogId) => {
    setBlogs(blogs.filter(blog => blog.id !== blogId))
  }

  return (
    <div>
      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id}
          blog={blog}
          updateBlogInState={updateBlogInState}
          deleteBlogInState={deleteBlogInState} />
      )}
    </div>
  )
}

export default Blogs