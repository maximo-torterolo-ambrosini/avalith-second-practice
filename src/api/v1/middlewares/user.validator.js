const userRepository = require('../repositories/userRepository.js')

const verifyPermission = (req, res, next) => {
    if (req.payload.role !== 'admin' && req.payload.id !== req.params.id) {
        res.status(403).json({ error: 'Forbidden', status: 403, ok: false })
    } else {
        next()
    }
}

const verifyBody = (req, res, next) => {
    const { username, password, role } = req.body
    if (!username && !password && !role) {
        res.status(400).json({
            error: 'Bad request, Trying to update user with empty body',
            status: 400,
            ok: false
        })
    } else {
        next()
    }
}

const verifyUsername = async (req, res, next) => {
    const { username } = req.body
    if (username) {
        const exists = await userRepository.existsByUsername(username)
        if (exists) {
            return res
                .status(409)
                .json({ error: 'Conflict, username already exists', status: 409, ok: false })
        }
    }
    next()
}

const validateUpdatePassword = (req, res, next) => {
    const { password } = req.body
    if (password) {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
        const { password } = req.body
        if (!regex.test(password)) {
            return res.status(400).json({
                error: 'password must have at least 8 characters and one number.',
                status: 400,
                ok: false
            })
        }
    }
    next()
}

const sanitizeBody = (req, res, next) => {
    const { username, password, role } = req.body
    const body = {}
    if (username) {
        body.username = username
    }
    if (password) {
        body.password = password
    }
    if (role && req.payload.role === 'admin') {
        body.role = role
    }
    req.body = body
    next()
}

const verifyId = async (req, res, next) => {
    const { id } = req.params
    if (!id) {
        res.status(400).json({ error: 'Bad request, id is required', status: 400, ok: false })
    } else {
        if (isNaN(parseInt(id))) {
            res.status(400).json({
                error: 'Bad request, id must be a number',
                status: 400,
                ok: false
            })
        } else {
            const exists = await userRepository.existById(id)
            if (!exists) {
                return res.status(404).json({ error: 'Id Not found', status: 404, ok: false })
            }
            next()
        }
    }
}
module.exports = {
    verifyPermission,
    verifyBody,
    verifyUsername,
    sanitizeBody,
    validateUpdatePassword,
    verifyId
}
