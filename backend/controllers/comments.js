const commentsRouter = require("express").Router({ mergeParams: true });
const Comment = require("../models/comment");
const Blog = require("../models/blog");

commentsRouter.get("/", async (request, response, next) => {
  try {
    const blogId = request.params.blogId;
    const comments = await Comment.find({ blog: blogId });

    response.json(comments);
  } catch (exception) {
    next(exception);
  }
});

commentsRouter.post("/", async (request, response, next) => {
  try {
    const { content } = request.body;
    const blogId = request.params.blogId;

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return response.status(404).json({ error: "blog not found" });
    }

    const comment = new Comment({ content, blog: blog._id });
    const savedComment = await comment.save();

    blog.comments = blog.comments.concat(savedComment._id);
    await blog.save();

    response.status(201).json(savedComment);
  } catch (exception) {
    next(exception);
  }
});

module.exports = commentsRouter;
