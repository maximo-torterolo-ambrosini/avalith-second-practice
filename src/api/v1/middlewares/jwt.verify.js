const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const token = req.cookies['access_token']

    if (!token) {
        return res.status(403).json({
            error: 'No token provided',
            status: 403,
            ok: false
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.payload = decoded
        next()
    } catch (err) {
        console.log(err)
        return res.status(401).json({
            error: 'Token is not valid, it may have expired',
            status: 401,
            ok: false
        })
    }
}

const verifyAdmin = (req, res, next) => {
    const { role } = req.payload
    if (role !== 'admin') {
        return res.status(403).json({
            error: 'You are not authorized to perform this action',
            status: 403,
            ok: false
        })
    }
    next()
}

module.exports = {
    verifyToken,
    verifyAdmin
}
