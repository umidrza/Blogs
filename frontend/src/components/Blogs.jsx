import Blog from "./Blog"

const Blogs = ({ blogs, updateBlogInState, deleteBlogInState }) => {
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