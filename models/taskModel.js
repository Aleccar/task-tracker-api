const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)


const getAllTasks = async (filterKey, filterValue) => {
    if (filterKey && filterValue) {
        const { data, error } = await supabase
            .from('tasks')
            .select('*')
            .eq(filterKey, filterValue)

        return { data, error }
    }
    
    const { data, error } = await supabase.from('tasks').select('*')
    return { data, error }
};


const getTaskByID = async (id) => {
    const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('id', id)

    return { data, error }
}


const insertTask = async (task) => {
    const { data, error } = await supabase
        .from('tasks')
        .insert(task)
        .select()

    return { data, error }
}


const updateTask = async (id, task) => {
    const { data, error } = await supabase
        .from('tasks')
        .update(task)
        .eq('id', id)
        .select()

    return { data, error }
}


const deleteTask = async (id) => {
    const { data, error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id)
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