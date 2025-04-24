import express, { json } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'


const app = express()
app.use(cors())
app.use(express.json)







app.get('/',(req,res=>{
    res.send('hello from server side')
}))

PORT = process.env.PORT
app.listen(PORT,(req,res)=>{
    console.log('server is connected from the port',Port)
})