const express = require('express')
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey)


const taskRouter = express.Router();


// Get all tasks
taskRouter.get('/all-info', async (req, res, next) => {
    const { data: tasks, error } = await supabase.from('tasks').select('*')
    
    if (error) {
        res.status(500).json({error: 'Failed to fetch tasks'})
    } else {
        res.status(200).json({data: tasks})
    }
})



module.exports = taskRouter;