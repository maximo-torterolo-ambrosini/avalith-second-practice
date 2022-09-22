require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const app = express()

app.use(cookieParser())
app.use(bodyParser.json())

// api/v1/auth endpoints
app.use('/api/v1', require('./api/v1/router/auth'))
app.use('/api/v1', require('./api/v1/router/user'))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('Server is running on ', PORT)
})
