# MERN Todo App

A basic Todo List application built with the MERN stack.

## Getting Started

### Prerequisites

- [Node.js & npm](https://nodejs.org/) installed
- A running MongoDB Atlas cluster (connection string in `backend/server.js`)

### Project Structure


### Setup & Run

1. **Clone & install**

   ```bash
   git clone <repo-url>
   cd mern-todo-app

cd backend
npm install
# In server.js, set your MongoDB URI:
# mongoose.connect('<your-atlas-uri>')
npm start

The API will run at http://localhost:5000/todos.

cd ../frontend
npm install
npm start
The app will open at http://localhost:3000.