const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response, next) => {
    try {
        const blogs = await Blog.find({})
            .populate('user', { username: 1, name: 1 })

        response.json(blogs)
    } catch (exception) {
        next(exception)
    }
})

blogsRouter.get('/:id', async (request, response, next) => {
    try {
        const blog = await Blog.findById(request.params.id)

        if (blog) {
            response.json(blog)
        } else {
            response.status(404).end()
        }
    }
    catch (exception) {
        next(exception)
    }
})

blogsRouter.post('/', async (request, response, next) => {
    try {
        const { title, author, url, likes, userId } = request.body

        const user = await User.findById(userId)

        if (!user) {
            return response.status(400).json({ error: 'userId missing or not valid' })
        }

        const blog = new Blog({ title, author, url, likes, user: user._id })
        const savedBlog = await blog.save()

        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()

        response.status(201).json(savedBlog)
    }
    catch (exception) {
        next(exception)
    }
})

blogsRouter.put('/:id', async (request, response, next) => {
    try {
        const blog = request.body

        const updatedBlog = await Blog.findByIdAndUpdate(
            request.params.id,
            blog,
            { returnDocument: 'after', runValidators: true, context: 'query' }
        )

        if (updatedBlog) {
            response.json(updatedBlog)
        } else {
            response.status(404).end()
        }
    }
    catch (exception) {
        next(exception)
    }
})

blogsRouter.delete('/:id', async (request, response, next) => {
    try {
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
    }
    catch (exception) {
        next(exception)
    }
})

module.exports = blogsRouter

