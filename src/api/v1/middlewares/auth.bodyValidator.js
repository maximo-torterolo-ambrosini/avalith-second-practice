const userRepository = require('../repositories/userRepository.js')

const validateBody = (req, res, next) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res.status(400).json({
            error: 'username and password are required',
            status: 400,
            ok: false
        })
    }
    next()
}

const validateUsername = async (req, res, next) => {
    try {
        const { username } = req.body
        const userExists = await userRepository.existsByUsername(username)
        if (userExists) {
            return res.status(400).json({
                error: 'username already exists',
                status: 400,
                ok: false
            })
        }
        next()
    } catch (err) {
        return res.status(500).json({ error: err.message, status: 500, ok: false })
    }
}

const validatePassword = (req, res, next) => {
    /*
     * this regex is from https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
     * it checks if the password has at least 8 characters and  one number.
     */
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    const { password } = req.body
    if (!regex.test(password)) {
        return res.status(400).json({
            error: 'password must have at least 8 characters and one number.',
            status: 400,
            ok: false
        })
    }
    next()
}

module.exports = {
    validateBody,
    validateUsername,
    validatePassword
}
