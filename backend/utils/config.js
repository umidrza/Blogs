require('dotenv').config()

const PORT = process.env.PORT || 3003

const MONGODB_URI = process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI

const JWT_SECRET = process.env.JWT_SECRET

if (!MONGODB_URI) {
  throw new Error('Missing required environment variable: MONGODB_URI or TEST_MONGODB_URI')
}

if (!JWT_SECRET) {
  throw new Error('Missing required environment variable: JWT_SECRET')
}

module.exports = { MONGODB_URI, PORT, JWT_SECRET }