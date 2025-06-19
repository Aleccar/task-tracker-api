const express = require('express')
const { handleLogin, handleRegister } = require('../controllers/authController');
const { getMe } = require('../controllers/userController')
const { authenticate } = require('../middleware/authMiddleware');


const userRouter = express.Router();


userRouter.post('/register', handleRegister)
userRouter.post('/login', handleLogin)

userRouter.get('/me', authenticate, getMe)


module.exports = userRouter