const express = require('express')
const { createClient } = require('@supabase/supabase-js')


const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_ANON_KEY
const serviceKey = process.env.SUPABASE_SERVICE_KEY

const supabase = createClient(supabaseUrl, serviceKey)


const taskRouter = express.Router();


// Get all tasks
taskRouter.get('/', async (req, res, next) => {
    const { data: tasks, error } = await supabase.from('tasks').select('*')

    if (error) {
        res.status(500).json({ error: 'Failed to fetch tasks' })
    } else {
        res.status(200).json({ data: tasks })
    }
})

// Get a specific task
taskRouter.get('/:id', async (req, res, next) => {
    const idToGet = req.params.id

    const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('id', idToGet)

    if (error) {
        res.status(500).json({ error: 'Could not find the task.' })
    } else if (!data || data.length === 0) {
        res.status(400).json({ error: 'Could not find a task with that id.' })
    } else {
        res.status(200).json(data)
    }
})

// Add a new task
taskRouter.post('/', async (req, res, next) => {
    const insertData = req.body

    if (insertData === undefined || insertData.title === undefined || insertData.completed === undefined || insertData.dueDate === undefined) {
        res.status(400).json({ error: 'You need to add a title, a completed, and a due date.' })
    } else {
        const { data, error } = await supabase
            .from('tasks')
            .insert([
                {
                    title: insertData.title,
                    completed: insertData.completed,
                    dueDate: insertData.dueDate
                }
            ]).select()

        if (error) {
            console.log(error)
            res.status(500).json({ error: 'Failed to insert new data into tasks.' })
        } else {
            res.status(201).json(data)
        }
    }
})

// Update an existing task
taskRouter.put('/:id', async (req, res, next) => {
    const idToUpdate = req.params.id
    const dataToUpdate = req.body

    console.log(dataToUpdate)

    if (dataToUpdate === undefined) {
        res.status(400).json({ error: 'You need to add a category and what to change in order to update.' })
    } else {
        const { data, error } = await supabase
            .from('tasks')
            .update(dataToUpdate)
            .eq('id', idToUpdate)
            .select()

        if (error) {
            console.log(error)
            res.status(500).json({ error: 'Failed to update task.' })
        } else {
            res.status(200).json({ data })
        }
    }
})

// Delete a task from database
taskRouter.delete('/:id', async (req, res, next) => {
    const idToDelete = req.params.id

    const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', idToDelete)

    if (error) {
        res.status(500).json({ error: `Could not delete the row with id#${idToDelete}` })
    } else {
        res.sendStatus(204)
    }
})


module.exports = taskRouter;