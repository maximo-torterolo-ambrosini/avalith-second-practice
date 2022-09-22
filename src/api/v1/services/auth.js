const bcrypt = require('bcrypt')
require('dotenv').config()
const userRepository = require('../repositories/userRepository.js')

const hashPassword = (password) => {
    const saltRounds = parseInt(process.env.SALT_ROUNDS)
    const salt = bcrypt.genSaltSync(saltRounds)
    return bcrypt.hashSync(password, salt)
}

const comparePassword = (password, hash) => {
    return bcrypt.compareSync(password, hash)
}

const login = async (username, password) => {
    const user = await userRepository.findOneByUsernameIncludePassword(username)
    const isPasswordCorrect = comparePassword(password, user.password)
    if (!user || !isPasswordCorrect) {
        throw { message: 'username or password is incorrect' }
    }
    // remove password from user object
    return { username: user.username, role: user.role, id: user.id }
}

const signUp = async (username, password) => {
    const hashedPassword = hashPassword(password)
    const user = await userRepository.createOne(username, hashedPassword, 'user', new Date())
    return { username: user.username, role: user.role, id: user.id }
}

module.exports = {
    login,
    signUp,
    hashPassword
}
