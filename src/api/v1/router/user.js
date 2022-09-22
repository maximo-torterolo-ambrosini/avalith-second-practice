const { Router } = require('express')
const userController = require('../controllers/user')
const userService = require('../services/user')
const { verifyToken, verifyAdmin } = require('../middlewares/jwt.verify')
const {
    verifyPermission,
    validateUpdatePassword,
    verifyUsername,
    sanitizeBody,
    verifyId,
    verifyBody
} = require('../middlewares/user.validator')

const r = Router()

r.get('/users', verifyToken, verifyAdmin, userController.getAll(userService))
r.get('/users/:id', verifyToken, verifyPermission, verifyId, userController.getById(userService))
r.put(
    '/users/:id',
    verifyToken,
    verifyPermission,
    verifyBody,
    verifyId,
    validateUpdatePassword,
    verifyUsername,
    sanitizeBody,
    userController.update(userService)
)
r.delete(
    '/users/:id',
    verifyToken,
    verifyPermission,
    verifyId,
    userController.deleteOne(userService)
)

module.exports = r
