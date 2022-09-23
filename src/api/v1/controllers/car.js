const getAll = (service) => async (req, res) => {
    try {
        const cars = await service.getCars()
        res.json(cars)
    } catch (err) {
        res.status(500).json({ error: err.message, status: 500, ok: false })
    }
}

const getOne = (service) => async (req, res) => {
    try {
        const car = await service.getCarById(req.params.id)
        res.json(car)
    } catch (err) {
        res.status(500).json({ error: err.message, status: 500, ok: false })
    }
}

const createOne = (service) => async (req, res) => {
    try {
        const car = await service.createCar(req.body)
        res.json(car)
    } catch (err) {
        res.status(500).json({ error: err.message, status: 500, ok: false })
    }
}

const updateOne = (service) => async (req, res) => {
    try {
        const car = await service.updateCar(req.params.id, req.body)
        res.status(204).send('')
    } catch (err) {
        res.status(500).json({ error: err.message, status: 500, ok: false })
    }
}

const deleteOne = (service) => async (req, res) => {
    try {
        const car = await service.deleteCar(req.params.id)
        res.status(204).send('')
    } catch (err) {
        res.status(500).json({ error: err.message, status: 500, ok: false })
    }
}

module.exports = {
    getAll,
    getOne,
    createOne,
    updateOne,
    deleteOne
}
