import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import todoRouter from './routers/TodosRouter.js'; // Ensure correct path

dotenv.config(); // Load environment variables from .env file

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/mydata', { // Use environment variable for URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to the database'))
.catch(err => console.error('Error connecting to the database:', err));


app.get('/', (req, res) => {
    res.send('Hello from server side');
});


app.use('/api/v1', todoRouter);


const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});