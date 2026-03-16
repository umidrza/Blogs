const _ = require("lodash")

const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    return blogs.reduce((total, blog) => total + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return null;
    return blogs.reduce((favorite, blog) => blog.likes > favorite.likes ? blog : favorite, blogs[0]);
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return null;

    return _(blogs)
        .groupBy("author")
        .map((list, author) => ({
            author,
            blogs: list.length
        }))
        .maxBy("blogs");
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) return null;

    return _(blogs)
        .groupBy("author")
        .map((list, author) => ({
            author,
            likes: _.sumBy(list, "likes")
        }))
        .maxBy("likes");
};

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}