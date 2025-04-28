# Todo Web Application

A simple todo application with a Golang backend API and React frontend.

## Project Structure

- `backend/`: Go API server using Gin framework and SQLite database
- `frontend/`: React application

## Setup Instructions

### Backend

1. Navigate to the backend directory:
```
cd backend
```

2. Install Go dependencies:
```
go mod tidy
```

3. Run the server:
```
go run main.go
```

The backend API will be available at http://localhost:8080

### Frontend

1. Navigate to the frontend directory:
```
cd frontend
```

2. Install npm dependencies:
```
npm install
```

3. Start the development server:
```
npm start
```

The frontend application will be available at http://localhost:3000

## API Endpoints

- `GET /api/todos`: Get all todo items
- `POST /api/todos`: Create a new todo item
- `PUT /api/todos/:id`: Update a todo item's status
- `DELETE /api/todos/:id`: Delete a todo item
