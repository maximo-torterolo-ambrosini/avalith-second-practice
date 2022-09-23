const { Router } = require('express')
const carController = require('../controllers/car')
const carService = require('../services/cars')
const { verifyToken, verifyAdmin } = require('../middlewares/jwt.verify')
const {
    sanitizeBody,
    validateBody,
    validateCarId,
    verifyCarExists,
    validateUserId
} = require('../middlewares/cars.validator')

const r = Router()

r.get('/cars', verifyToken, carController.getAll(carService))

r.get('/cars/:id', verifyToken, validateCarId, verifyCarExists, carController.getOne(carService))
r.post(
    '/cars',
    verifyToken,
    verifyAdmin,
    validateBody,
    sanitizeBody,
    validateUserId,
    carController.createOne(carService)
)
r.put(
    '/cars/:id',
    verifyToken,
    verifyAdmin,
    validateCarId,
    verifyCarExists,
    sanitizeBody,
    validateUserId,
    carController.updateOne(carService)
)
r.delete(
    '/cars/:id',
    verifyToken,
    verifyAdmin,
    validateCarId,
    verifyCarExists,
    carController.deleteOne(carService)
)

module.exports = r
