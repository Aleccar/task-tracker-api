const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


// TODO: Move these to models/userModel later
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)


const userRouter = express.Router();



userRouter.post('/register', async (req, res, next) => {
    const { email, password } = req.body

    // TODO: make a validation utility function for this.
    if (!email || !password) {
        res.status(400).json({ error: 'Missing required fields: Email and Password are both required.' })
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const { data, error } = await supabase
            .from('users')
            .insert([{ email, password: hashedPassword }])

        if (error) {
            throw error
        } else {
            res.status(201).json({ message: 'User registered successfully.' })
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to register new user. Please try again later.' })
    }
})


userRouter.post('/login', async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
        res.status(400).json({ error: 'Missing required fields: email and password are both required.' })
    }

    try {
        // Fetch users to validate input data:
        const { data: users, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)

        if (error || users.length === 0) {
            return res.status(400).json({ error: 'invalid credentials' })
        }

        const user = users[0]

        // Compare password to user input:
        const matchingPass = await bcrypt.compare(password, user.password)
        if (!matchingPass) {
            return res.status(401).json({ error: 'Incorrect password' })
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ token })

    } catch (error) {
        res.status(500).json({ error: 'Login failed' })
    }
})

module.exports = userRouter