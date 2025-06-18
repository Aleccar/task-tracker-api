const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)


const registerUser = async (email, password) => {

    const { data, error } = await supabase
        .from('users')
        .insert([{ email, password }])

    return { data, error }
}


const loginUser = async (email) => {
    const { data: users, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)


    return { data: users, error }
}



module.exports = {
    loginUser,
    registerUser
}