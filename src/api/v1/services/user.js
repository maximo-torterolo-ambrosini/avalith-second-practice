const userRepository = require('../repositories/userRepository.js')
const { hashPassword } = require('./auth.js')

const getUsers = async () => {
    const users = await userRepository.findAll()
    return users
}

const updateUser = async (id, data) => {
    if (data.password) {
        data.password = hashPassword(data.password)
    }
    const user = await userRepository.updateOneById(id, data)
    return user
}

const deleteUser = async (id) => {
    const user = await userRepository.deleteOneById(id)
    return user > 0 ? true : false
}

const getUserById = async (id) => {
    const user = await userRepository.findOneById(id)
    return user
}

module.exports = {
    updateUser,
    deleteUser,
    getUserById,
    getUsers
}
