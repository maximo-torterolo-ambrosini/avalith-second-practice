const Cars = require('../model').Car

const findAll = async () => {
    const cars = await Cars.findAll()
    return cars
}

const findOneById = async (id) => {
    const car = await Cars.findOne({ where: { id } })
    return car
}

const existsById = async (id) => {
    const car = await Cars.findOne({ where: { id } })
    return car !== null
}

const createOne = async (data) => {
    const { brand, model, color, userId } = data
    const car = await Cars.create({
        brand,
        model,
        color,
        userId,
        createdAt: Date.now(),
        updatedAt: Date.now()
    })
    return car
}

const updateOneById = async (id, data) => {
    const { brand, model, color, userId } = data
    const car = await Cars.update(
        {
            brand,
            model,
            color,
            userId,
            updatedAt: Date.now()
        },
        { where: { id } }
    )
    return car
}

const deleteOneById = async (id) => {
    const car = await Cars.destroy({ where: { id } })
    return car
}

module.exports = {
    findAll,
    findOneById,
    createOne,
    updateOneById,
    deleteOneById,
    existsById
}
