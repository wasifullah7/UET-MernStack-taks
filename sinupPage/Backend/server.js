import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import myRouter from './router/userRoutes'


const app = express()

dotenv.config()


app.use(cors())
app.use(express.json())




mongoose.connect('mongodb://localhost/userData')
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err))


app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.use('/api/user', myRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
} )

