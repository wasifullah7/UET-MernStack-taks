import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import myRouter from './routers/TodosRouter.js'; 

dotenv.config(); 

const app = express();
app.use(cors()); 
app.use(express.json()); 


mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/mydata', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to the database'))
.catch(err => console.error('Error connecting to the database:', err));


app.get('/', (req, res) => {
    res.send('Hello from the server side');
});


app.use('/api/v1', myRouter);




const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});