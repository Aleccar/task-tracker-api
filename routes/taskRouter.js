const express = require('express')
const { createClient } = require('@supabase/supabase-js')


const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_ANON_KEY
const serviceKey = process.env.SUPABASE_SERVICE_KEY

const supabase = createClient(supabaseUrl, serviceKey)


const taskRouter = express.Router();


// Get all tasks
taskRouter.get('/', async (req, res, next) => {
    const [filterKey] = Object.keys(req.query)
    const filterValue = req.query[filterKey]

    // When filter and value are undefined
    if (!filterKey && !filterValue) {
        try {
            const { data } = await supabase
                .from('tasks')
                .select('*')

            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while retrieving tasks. Please try again later.' })
        }
    } else {
        // Checking if both filterKey and filterValue hold information
        if (filterKey && filterValue) {
            try {
                const { data } = await supabase
                    .from('tasks')
                    .select('*')
                    .eq(filterKey, filterValue)

                res.status(200).json(data)
            } catch (error) {
                res.status(500).json({ error: `Unable to retrieve tasks using filter "${filterKey}" and value "${filterValue}".` })
            }
        } else {
            res.status(400).json({ error: 'You need to add both a filter and a value.' })
        }
    }

})

// Get a specific task
taskRouter.get('/:id', async (req, res, next) => {
    const idToGet = req.params.id

    try {
        const {data} = await supabase
        .from('tasks')
        .select('*')
        .eq('id', idToGet)

        if (!data || data.length === 0) {
            res.status(400).json({ error: `No task found with ID: ${idToGet}` })
        } else {
            res.status(200).json(data)
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error while fetching the task. Please try again later.' })
    }
})

// Add a new task
taskRouter.post('/', async (req, res, next) => {
    const insertData = req.body

    if (insertData === undefined || insertData.title === undefined || insertData.completed === undefined || insertData.dueDate === undefined) {
        res.status(400).json({ error: 'Missing required fields: title, completed, and dueDate are all required.' })
    } else {

        try {
            const { data } = await supabase
            .from('tasks')
            .insert([
                {
                    title: insertData.title,
                    completed: insertData.completed,
                    dueDate: insertData.dueDate
                }
            ]).select()

            res.status(201).json(data)
        } catch (error) {
            res.status(500).json({ error: 'Failed to create new task. Please try again later.' })
        }
    }
})

// Update an existing task
taskRouter.put('/:id', async (req, res, next) => {
    const idToUpdate = req.params.id
    const dataToUpdate = req.body

    if (dataToUpdate === undefined) {
        res.status(400).json({ error: 'Please provide task fields to update.' })
    } else {
        try {
            const { data } = await supabase
            .from('tasks')
            .update(dataToUpdate)
            .eq('id', idToUpdate)
            .select()

            res.status(200).json({ data })
        } catch (error) {
            res.status(500).json({ error: `Could not update task with ID: ${idToUpdate}` })
        }
    }
})

// Delete a task from database
taskRouter.delete('/:id', async (req, res, next) => {
    const idToDelete = req.params.id

    try {
        const { data } = await supabase
        .from('tasks')
        .delete()
        .eq('id', idToDelete)
        .select()

        if (data.length === 0) {
            res.status(404).json({error: `No task with the ID: ${idToDelete} exists.`})
        } else {
            res.sendStatus(204)
        }
    } catch (error) {
        res.status(500).json({ error: `Failed to delete task with ID: ${idToDelete}` })
    }
})


module.exports = taskRouter;