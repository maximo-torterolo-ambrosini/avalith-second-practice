const User = require('../model').User

const findOneByUsername = async (userName) => {
    const user = await User.findOne({
        where: { username: userName },
        include: 'Cars',
        attributes: { exclude: ['password'] }
    })
    return user
}

const findAll = async () => {
    const users = await User.findAll({ include: 'Cars', attributes: { exclude: ['password'] } })
    return users
}

const existsByUsername = async (username) => {
    const user = await User.findOne({ where: { username } })
    return user !== null
}

const existById = async (id) => {
    const user = await User.findOne({ where: { id } })
    return user !== null
}

const findOneByUsernameIncludePassword = async (username) => {
    const user = await User.findOne({
        where: { username: username },
        include: 'Cars'
    })
    return user
}

const findPasswordByUsername = async (username) => {
    const result = await User.findOne({ where: { username: username }, attributes: ['password'] })
    return result.password
}

const findOneById = async (id) => {
    const user = await User.findOne({
        where: { id },
        include: 'Cars',
        attributes: { exclude: ['password'] }
    })
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

const deleteOneById = async (id) => {
    const user = await User.destroy({ where: { id } })
    return user
}

const updateOneById = async (id, { user }) => {
    const user = await User.update(
        {
            username: user.username,
            password: user.password,
            role: user.role
        },
        { where: { id } }
    )
    return user
}

module.exports = {
    findOneByUsername,
    createOne,
    findAll,
    findOneById,
    deleteOneById,
    findPasswordByUsername,
    findOneByUsernameIncludePassword,
    existsByUsername
}
