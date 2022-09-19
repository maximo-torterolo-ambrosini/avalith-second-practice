const User = require('../model').User

const findOneByUsername = async (userName) => {
    const user = await User.findOne({ where: { username: userName } })
    return user
}

const findAll = async () => {
    const users = await User.findAll()
    return users
}

const findOneById = async (id) => {
    const user = await User.findOne({ where: { id } })
    return user
}

const createOne = async (username, password, role, createdAt) => {
    const user = await User.create({
        username,
        password,
        role,
        createdAt
    })
    return user
}

module.exports = {
    findOneByUsername,
    createOne
}
