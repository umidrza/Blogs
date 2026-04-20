# Blogs Application

A full-stack blog application with user authentication, blog management, and comments.

## Project Structure

- `backend/` - Node.js/Express API server
- `frontend/` - React/Vite client application
- `e2e/` - End-to-end tests with Playwright

## Getting Started

1. Clone the repository and navigate to the project directory.

2. Install dependencies for each part:
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   cd ../e2e && npm install
   ```

3. Set up environment variables:
   - Backend: Create `.env` file as described in `backend/README.md`
   - Ensure MongoDB is running for backend

4. Start the backend:
   ```bash
   cd backend && npm run dev
   ```

5. Start the frontend:
   ```bash
   cd frontend && npm run dev
   ```

6. Run tests:
   - Backend: `cd backend && npm test`
   - Frontend: `cd frontend && npm test`
   - E2E: `cd e2e && npm test` (requires backend and frontend running)

## Features

- User registration and authentication
- Create, read, update, delete blogs
- Comment on blogs
- User profiles
- Responsive UI

## Technologies

- Backend: Node.js, Express, MongoDB, JWT
- Frontend: React, Redux, Axios
- Testing: Node test runner, Vitest, Playwright

## Contributing

See individual READMEs in each directory for more details.