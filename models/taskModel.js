const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)


const getAllTasks = async (filterKey, filterValue, userId) => {
    if (filterKey && filterValue) {
        const { data, error } = await supabase
            .from('tasks')
            .select('*')
            .eq(filterKey, filterValue)
            .eq('userId', userId)

        return { data, error }
    }

    const { data, error } = await supabase.from('tasks').select('*').eq('userId', userId)
    return { data, error }
};


const getTaskByID = async (id, userId) => {
    const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('id', id)
        .eq('userId', userId)

    return { data, error }
}


const insertTask = async (task, userId) => {
    const { data, error } = await supabase
        .from('tasks')
        .insert({ title: task.title, completed: task.completed, dueDate: task.dueDate, userId: userId })
        .select()

    return { data, error }
}


const updateTask = async (id, task, userId) => {
    const { data, error } = await supabase
        .from('tasks')
        .update(task)
        .eq('id', id)
        .eq('userId', userId)
        .select()

    return { data, error }
}


const deleteTask = async (id, userId) => {
    const { data, error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id)
        .eq('userId', userId)
        .select()

    return { data, error }
}


module.exports = {
    getAllTasks,
    getTaskByID,
    insertTask,
    updateTask,
    deleteTask
}