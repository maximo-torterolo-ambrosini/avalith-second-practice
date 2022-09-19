const { Sequelize } = require('sequelize')

const { POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST } = process.env

const sequelize = new Sequelize(POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, {
    host: POSTGRES_HOST,
    dialect: 'postgres'
})

const testConnection = () => {
    sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.')
        })
        .catch((err) => {
            console.error('Unable to connect to the database:', err)
        })
}
sequelize.testConnection = testConnection

Object.freeze(sequelize)

module.exports = sequelize
