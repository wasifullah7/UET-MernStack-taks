import  express from 'express'
import { singUp } from '../controlller/userController'




const myRouter = express.Router()


myRouter.post('/signup', singUp)



export default myRouter