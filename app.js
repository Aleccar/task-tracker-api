const express = require('express')
require('dotenv').config()
const taskRouter = require('./routes/taskRouter')
const morgan = require('morgan')


const app = express()


// Middleware
app.use(morgan('short'))
app.use(express.json())


app.use('/tasks', taskRouter)





const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})