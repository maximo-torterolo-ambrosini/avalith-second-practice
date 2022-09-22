const getAll = (service) => async (req, res) => {
    try {
        const users = await service.getUsers()
        res.json(users)
    } catch (err) {
        res.status(500).json({ error: err.message, status: 500, ok: false })
    }
}

const getById = (service) => async (req, res) => {
    try {
        const user = await service.getUserById(req.params.id)
        res.json(user)
    } catch (err) {
        res.status(500).json({ error: err.message, status: 500, ok: false })
    }
}

const update = (service) => async (req, res) => {
    try {
        const user = await service.updateUser(req.params.id, req.body)
        res.status(204).send('')
    } catch (err) {
        res.status(500).json({ error: err.message, status: 500, ok: false })
    }
}

const deleteOne = (service) => async (req, res) => {
    try {
        await service.deleteUser(req.params.id)
        res.status(204).send('')
    } catch (err) {
        res.status(500).json({ error: err.message, status: 500, ok: false })
    }
}

module.exports = {
    getAll,
    getById,
    update,
    deleteOne
}
