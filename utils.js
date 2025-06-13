const invalidInput = (task) => {
    if (task === undefined || task.title === undefined || task.completed === undefined || task.dueDate === undefined) {
        return true 
    }
    return false
}


module.exports = { invalidInput };