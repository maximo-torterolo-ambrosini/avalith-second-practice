const carsRepository = require('../repositories/carRepository')
const userRepository = require('../repositories/userRepository')

const validateBody = (req, res, next) => {
    const { brand, model, color, userId } = req.body
    if (!brand || !model || !color) {
        return res.status(400).json({ error: 'Missing required fields', status: 400, ok: false })
    }
    if (userId) {
        const id = parseInt(userId)
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid user id', status: 400, ok: false })
        }
        req.body.userId = id
    } else {
        req.body.userId = null
    }
    next()
}

const sanitizeBody = (req, res, next) => {
    const { brand, model, color, userId } = req.body
    const sanitized = {}

    if (typeof brand === 'string') {
        sanitized.brand = brand
    } else {
        return res.status(400).json({ error: 'Invalid brand', status: 400, ok: false })
    }
    if (typeof model === 'string') {
        sanitized.model = model
    } else {
        return res.status(400).json({ error: 'Invalid model', status: 400, ok: false })
    }
    if (typeof color === 'string') {
        sanitized.color = color
    } else {
        return res.status(400).json({ error: 'Invalid color', status: 400, ok: false })
    }
    sanitized.userId = userId
    req.body = sanitized
    next()
}

const validateCarId = (req, res, next) => {
    const id = req.params.id
    if (!id) {
        return res
            .status(400)
            .json({ error: 'Bad request, id is required', status: 400, ok: false })
    } else {
        if (isNaN(parseInt(id))) {
            return res
                .status(400)
                .json({ error: 'Invalid car id, must be a number', status: 400, ok: false })
        } else {
            req.params.id = parseInt(id)
            next()
        }
    }
}

const verifyCarExists = async (req, res, next) => {
    const id = req.params.id
    const exists = await carsRepository.existsById(id)
    if (!exists) {
        return res.status(404).json({ error: 'Car Id not found', status: 404, ok: false })
    }
    next()
}

const validateUserId = async (req, res, next) => {
    const { userId } = req.body
    if (userId) {
        const exists = await userRepository.existById(userId)
        if (!exists) {
            return res.status(404).json({ error: 'User Id not found', status: 404, ok: false })
        }
    }
    next()
}
module.exports = { sanitizeBody, validateBody, validateCarId, verifyCarExists, validateUserId }
