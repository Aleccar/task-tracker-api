const express = require('express')
const {handleLogin, handleRegister} = require('../controllers/authController')


const userRouter = express.Router();


userRouter.post('/register', handleRegister)
userRouter.post('/login', handleLogin)



module.exports = userRouter