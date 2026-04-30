# Backend

This is the backend API for the Blogs application, built with Node.js, Express, and MongoDB.

## Features

- User authentication with JWT
- Blog management (CRUD operations)
- User management
- Comments on blogs
- Testing with Node.js built-in test runner

## Technologies

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing
- ESLint for linting

## Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

   For testing with an in-memory database, install mongodb-memory-server:
   ```bash
   npm install --save-dev mongodb-memory-server
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   TEST_MONGODB_URI=your_test_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=3003
   ```

   For testing, you can use a separate test database or MongoDB Memory Server.

## Running the Application

- Development mode:
  ```bash
  npm run dev
  ```

- Production mode:
  ```bash
  npm start
  ```

- Test mode:
  ```bash
  npm run start:test
  ```

## Testing

Run tests:
```bash
npm test
```

## Linting

Check code style:
```bash
npm run lint
```

## API Endpoints

- `POST /api/login` - Login
- `POST /api/users` - Create user
- `GET /api/users` - Get all users
- `GET /api/blogs` - Get all blogs
- `POST /api/blogs` - Create blog
- `PUT /api/blogs/:id` - Update blog
- `DELETE /api/blogs/:id` - Delete blog
- `POST /api/blogs/:id/comments` - Add comment to blog

## Recommendations

- Add input validation using a library like Joi or express-validator.
- Implement rate limiting to prevent abuse.
- Add CORS configuration for frontend integration.
- Consider adding API documentation with Swagger.
- Add more comprehensive error handling and logging.
- Implement pagination for blogs and users endpoints.
- Add unit tests for individual functions and middleware.
- Use MongoDB Memory Server for testing to avoid needing a separate test database.