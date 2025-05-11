# User Authentication System

A full-stack user authentication system with signup and login functionality built with React (TypeScript), Golang, and SQLite.

## Features

- User registration with name, email, and password
- Password hashing with bcrypt
- JWT-based authentication
- Protected routes and API endpoints
- Persistent sessions with localStorage
- Responsive UI

## Project Structure

```
.
├── backend/               # Golang REST API
│   ├── controllers/       # API route handlers
│   ├── middlewares/       # Authentication middleware
│   ├── models/            # Data models and database operations
│   └── main.go            # Entry point for the API
│
├── frontend/              # React TypeScript application
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── context/       # Authentication context
│   │   └── types/         # TypeScript type definitions
│   └── package.json       # Frontend dependencies
│
└── vercel.json            # Vercel deployment configuration
```

## Technology Stack

- **Frontend**:
  - React with TypeScript
  - React Router for navigation
  - Context API for state management
  - Axios for API requests

- **Backend**:
  - Golang with Gin framework
  - SQLite database
  - JWT for authentication
  - Bcrypt for password hashing

## Local Development

### Prerequisites

- Node.js and npm
- Go (1.16 or higher)
- Git

### Running the Backend

```bash
cd backend
go mod tidy
go run main.go
```

The API will be available at `http://localhost:8080`.

### Running the Frontend

```bash
cd frontend
npm install
npm start
```

The frontend development server will be available at `http://localhost:3000`.

## Deployment to Vercel

This project is configured for easy deployment to Vercel.

### Prerequisites

- A Vercel account
- Vercel CLI installed (`npm install -g vercel`)

### Deployment Steps

1. Login to Vercel CLI:
   ```bash
   vercel login
   ```

2. Deploy the project:
   ```bash
   vercel
   ```

3. For production deployment:
   ```bash
   vercel --prod
   ```

## Environment Variables

For production deployment, you should set the following environment variables in Vercel:

- `JWT_SECRET`: Secret key for JWT token generation
- `DATABASE_URL`: URL to your production database (if using a remote database)

## Authentication Flow

1. User registers with name, email, and password
2. Password is hashed with bcrypt before storing in the database
3. User logs in with email and password
4. Backend validates credentials and issues a JWT token
5. Frontend stores the token in localStorage
6. Protected routes check for a valid token before granting access
7. Token is included in API requests to authenticate the user 