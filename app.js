const express = require('express')
require('dotenv').config()
const taskRouter = require('./routes/taskRouter')
const loginRouter = require('./routes/loginRouter')
const morgan = require('morgan')
const cors = require('cors')



const app = express()

app.use(cors())

// Middleware
app.use(morgan('short'))
app.use(express.json())


app.use('/tasks', taskRouter)
app.use('/login', loginRouter)





const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})