const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const { userExtractor } = require("../utils/middleware");
const commentsRouter = require('./comments')

blogsRouter.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
      .populate("user", { username: 1, name: 1 })
      .populate("comments", { content: 1 });

    response.json(blogs);
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.get("/:id", async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id);

    if (blog) {
      response.json(blog);
    } else {
      response.status(404).end();
    }
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.post("/", userExtractor, async (request, response, next) => {
  try {
    const { title, author, url, likes } = request.body;
    const user = request.user;

    if (!user) {
      return response.status(401).json({ error: "user not authenticated" });
    }

    const blog = new Blog({ title, author, url, likes, user: user._id });
    const savedBlog = await blog.save();

    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.status(201).json(savedBlog);
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.put("/:id", userExtractor, async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id);

    if (!blog) {
      return response.status(404).json({ error: "blog not found" });
    }

    if (blog.user.toString() !== request.user.id.toString()) {
      return response.status(403).json({ error: "unauthorized" });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      request.body,
      { returnDocument: 'after', runValidators: true, context: "query" },
    );

    response.json(updatedBlog);
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.delete("/:id", userExtractor, async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id);

    if (!blog) {
      return response.status(404).json({ error: "blog not found" });
    }

    if (blog.user.toString() !== request.user.id.toString()) {
      return response.status(403).json({ error: "unauthorized" });
    }

    await Blog.findByIdAndDelete(request.params.id);

    response.status(204).end();
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.use('/:blogId/comments', commentsRouter)

module.exports = blogsRouter;
