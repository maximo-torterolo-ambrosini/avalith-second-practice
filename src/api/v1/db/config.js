require('dotenv').config()
const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_HOST } = process.env
module.exports = {
    development: {
        username: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        database: POSTGRES_DB,
        host: POSTGRES_HOST,
        dialect: 'postgres',
        define: {
            underscored: true
        }
    }
}
