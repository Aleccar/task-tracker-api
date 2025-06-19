

const getMe = async (req, res) => {
    try {
        res.json({ user: req.user })

    } catch (error) {
        res.status(500).json({ error: 'Could not retrieve the user information at this time, try again later.' })
    }
}


module.exports = {
    getMe
}