const express = require('express')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const config = require('./utils/config')

const app = express()

mongoose.connect(config.MONGODB_URI, { family: 4 })
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message)
    })

app.use(express.json())
app.use('/api/blogs', blogsRouter)

app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`)
})