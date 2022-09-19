const { Router } = require('express')
const { login, signUp } = require('../controllers/auth')
const authService = require('../services/auth')
const {
    validateBody,
    validateUsername,
    validatePassword
} = require('../middlewares/auth.bodyValidator')
const r = Router()
r.post('/auth/login', validateBody, login(authService))
r.post('/auth/signup', validateBody, validateUsername, validatePassword, signUp(authService))

module.exports = r
