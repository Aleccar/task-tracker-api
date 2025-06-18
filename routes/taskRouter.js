const express = require('express')
const {
    getAllTasks,
    getTaskByID,
    insertTask,
    updateTask,
    deleteTask
} = require('../models/taskModel.js')
const { invalidInput } = require('../utils.js')
const { authenticate } = require('../middleware/authMiddleware.js')


const taskRouter = express.Router();


// Get all tasks
taskRouter.get('/', authenticate ,async (req, res, next) => {
    const [filterKey] = Object.keys(req.query)
    const filterValue = req.query[filterKey]

    const userId = req.user.userId

    try {
        const { data, error } = await getAllTasks(filterKey, filterValue, userId)
        if (error) {
            throw error
        } else {
            res.status(200).json(data)
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving tasks. Please try again later.' })
    }
}
)

// Get a specific task
taskRouter.get('/:id', authenticate, async (req, res, next) => {
    const id = req.params.id
    const userId = req.user.userId

    try {
        const { data, error } = await getTaskByID(id, userId)

        if (error) {
            throw error
        }
        else if (!data || data.length === 0) {
            res.status(400).json({ error: `No task found with ID: ${id}` })
        } else {
            res.status(200).json(data)
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error while fetching the task. Please try again later.' })
    }
})

// Add a new task
taskRouter.post('/', authenticate, async (req, res, next) => {
    const task = req.body
    const userId = req.user.userId

    if (invalidInput(task)) {
        res.status(400).json({ error: 'Missing required fields: title, completed, and dueDate are all required.' })
    }

    try {
        const { data, error } = await insertTask(task, userId)
        if (error) {
            throw error
        } else {
            res.status(201).json(data)
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to create new task. Please try again later.' })
    }
})

// Update an existing task
taskRouter.put('/:id', authenticate, async (req, res, next) => {
    const id = req.params.id
    const task = req.body
    const userId = req.user.userId

    if (task === undefined) {
        res.status(400).json({ error: 'Please provide task fields to update.' })
    }
    try {
        const { data, error } = await updateTask(id, task, userId)
        if (error) {
            throw error
        } else {
            res.status(200).json({ data })
        }
    } catch (error) {
        res.status(500).json({ error: `Could not update task with ID: ${id}` })
    }

})

// Delete a task from database
taskRouter.delete('/:id', authenticate, async (req, res, next) => {
    const id = req.params.id
    const userId = req.user.userId

    try {
        const { data, error } = await deleteTask(id, userId)
        if (error) {
            throw error
        }
        else if (!data || data.length === 0) {
            res.status(404).json({ error: `No task with the ID: ${id} exists.` })
        } else {
            res.sendStatus(204)
        }
    } catch (error) {
        res.status(500).json({ error: `Failed to delete task with ID: ${id}` })
    }
})


module.exports = taskRouter;