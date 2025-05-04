const express = require("express");
const router = express.Router();
const User = require('../models/userModels')
const {register,login} = require('../controller/authController')

router.post('/register',register)
router.post('/login',login)


module.exports = router