import  express from 'express'
import { getUserData, signup } from '../controlller/userController.js'
import { login } from '../controlller/userController.js'




const myRouter = express.Router()


myRouter.post('/signup', signup)

myRouter.post('/login', login)
myRouter.get('/getuserData',getUserData)



export default myRouter