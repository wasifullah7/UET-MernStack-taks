// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const ConnectDB = require("./config/db");
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/todoRoutes')
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());


ConnectDB()

app.use('/api/todos',userRoutes)
app.use('/api/auth',authRoutes)

app.listen(5000, () => console.log("Server started on port 5000"));