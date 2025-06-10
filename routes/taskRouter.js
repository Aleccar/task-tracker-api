const express = require('express')
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey)


const taskRouter = express.Router();



// taskRouter.get('/', (req, res, next) => {
    
// })



module.exports = taskRouter;