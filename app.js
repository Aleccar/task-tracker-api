const express = require('express')
require('dotenv').config()
const taskRouter = require('./routes/taskRouter')
const { createClient } = require('@supabase/supabase-js')
const morgan = require('morgan')



const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey)
const app = express()


// Middleware Logging
app.use(morgan('short'))



app.use('/tasks', taskRouter)





const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})