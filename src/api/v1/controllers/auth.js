const jwt = require('jsonwebtoken')

const login = (service) => async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await service.login(username, password)
        const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' })
        res.cookie('access_token', token, {
            httpOnly: true,
            secure: false // since this is a practice project, we set this to false
        })
        res.json(user)
    } catch (err) {
        console.log(err)
        res.status(401).json({ error: err.message, status: 401, ok: false })
    }
}

const signUp = (service) => async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await service.signUp(username, password)
        const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' })
        res.cookie('access_token', token, {
            httpOnly: true,
            secure: false // since this is a practice project, we set this to false
        })
        res.status(201).json(user)
    } catch (err) {
        res.status(500).json({ error: err.message, status: 500, ok: false })
    }
}

module.exports = {
    login,
    signUp
}
