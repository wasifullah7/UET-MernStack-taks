import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import myRouter from './router/userRoutes.js';
import bodyParser from 'body-parser';

const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/userData');
        console.log('MongoDB connected...');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit the process with failure
    }
};

connectDB();

// Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/user', myRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});