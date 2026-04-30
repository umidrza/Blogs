# Blogs Application

A full-stack blog application with user authentication, blog management, and comments.

## Project Overview

This repository contains a complete full-stack blog app with:
- REST API backend built with Node.js, Express, MongoDB, and JWT authentication.
- React frontend built with Vite and Redux-style state management.
- End-to-end tests written with Playwright.

## Project Structure

- `backend/` - Node.js/Express API server
- `frontend/` - React/Vite client application
- `e2e/` - Playwright end-to-end tests

## Prerequisites

- Node.js 18+ or compatible version
- npm 10+ or compatible version
- MongoDB running locally or accessible remotely
- (Optional) Docker and Docker Compose for containerized development

## Setup

1. Clone the repository and navigate into it:
   ```bash
   git clone <repository-url>
   cd Blogs
   ```

2. Install dependencies for each project:
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   cd ../e2e && npm install
   ```

3. Create the required environment variables in the backend folder.
   - See `backend/README.md` for `.env` configuration details.
   - Common variables include MongoDB connection string and JWT secret.

## Running Locally

### Start Backend

```bash
cd backend
npm run dev
```

The backend should start on the configured port (commonly `3003`).

### Start Frontend

```bash
cd frontend
npm run dev
```

The frontend should start on Vite's default port, usually `5173`.

### Run All Services with Docker Compose

If you prefer Docker, use:

```bash
docker compose -f docker-compose.dev.yml up --build
```

This builds and starts the backend, frontend, and any services defined in the compose file.

## Testing

### Backend Tests

```bash
cd backend
npm test
```

### Frontend Tests

```bash
cd frontend
npm test
```

### End-to-End Tests

```bash
cd e2e
npm test
```

> Note: E2E tests require the backend and frontend to be running first.

## Features

- User registration and login with JWT authentication
- Create, read, update, and delete blog posts
- Add comments to blog posts
- User profile pages and blog ownership checks
- Responsive UI and validation feedback

## Technologies

- Backend: Node.js, Express, MongoDB, JWT
- Frontend: React, Vite, Redux-style state handling, Axios
- Testing: Vitest, Playwright

## Contributing

For implementation details, linting rules, and additional commands, see the individual README files in `backend/`, `frontend/`, and `e2e/`.
