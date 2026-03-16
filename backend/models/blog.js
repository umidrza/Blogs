const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    minlength: [3, "Title must be at least 3 characters long"],
    maxlength: [200, "Title cannot exceed 200 characters"],
    trim: true
  },
  author: {
    type: String,
    required: [true, "Author is required"],
    minlength: 2,
    maxlength: 100,
    trim: true
  },
  url: {
    type: String,
    required: [true, "URL is required"],
    match: [
      /^(https?:\/\/)?([\w-])+\.{1}([a-zA-Z]{2,63})([\w\-._~:/?#[\]@!$&'()*+,;=.]+)?$/,
      "Please use a valid URL"
    ]
  },
  likes: {
    type: Number,
    default: 0,
    min: [0, "Likes cannot be negative"]
  }
});

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog