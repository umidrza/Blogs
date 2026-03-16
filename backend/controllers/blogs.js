const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response, next) => {
    try {
        const blogs = await Blog.find({})
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
        const blog = new Blog(request.body)
        const savedBlog = await blog.save()

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

