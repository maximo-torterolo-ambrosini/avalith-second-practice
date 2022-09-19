'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            User.hasMany(models.Car, { foreignKey: 'userId' })
        }
    }
    User.init(
        {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            username: DataTypes.STRING,
            password: DataTypes.STRING,
            role: DataTypes.STRING,
            createdAt: DataTypes.DATE
        },
        {
            sequelize,
            modelName: 'User',
            tableName: 'Users',
            underscored: false,
            timestamps: true,
            updatedAt: false,
            createdAt: 'createdAt'
        }
    )
    return User
}
