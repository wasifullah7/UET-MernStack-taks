# Blog App

A simple blog application using React (frontend) and Node.js + Express (backend) with MongoDB.

## 🔧 How to Run Locally

### 1. Clone the repository

``bash
git clone https://github.com/your-username/blog-app.git
cd blog-app

cd backend
npm install

Create a .env file in the backend folder with the following:
MONGO_URI=your_mongodb_connection_url
PORT=8080
node server.js

cd frontend
npm install
npm start

This will start the frontend at http://localhost:3000.
