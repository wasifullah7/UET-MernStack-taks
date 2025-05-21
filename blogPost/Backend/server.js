import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import blogRouter from "./router/blogRouter.js";

const app = express();
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
    res.send("Hello World");
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("MongoDB connected");
}).catch((err) => {
    console.error("MongoDB connection error:", err);
});

// Routes
app.use("/blog", blogRouter); // Handles all blog-related routes

// Start the server
const PORT = process.env.PORT; // Default to 5000 if PORT is not defined
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});