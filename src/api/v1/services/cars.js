const carRepository = require('../repositories/carRepository')

const getCars = async () => {
    const cars = await carRepository.findAll()
    return cars
}

const getCarById = async (id) => {
    const car = await carRepository.findOneById(id)
    return car
}

const createCar = async (data) => {
    const car = await carRepository.createOne(data)
    return car
}

const updateCar = async (id, data) => {
    const car = await carRepository.updateOneById(id, data)
    return car
}

const deleteCar = async (id) => {
    const car = await carRepository.deleteOneById(id)
    return car > 0 ? true : false
}

module.exports = {
    getCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar
}
