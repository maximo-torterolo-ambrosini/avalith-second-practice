'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Cars extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Cars.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' })
        }
    }
    Cars.init(
        {
            brand: DataTypes.STRING,
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            model: DataTypes.STRING,
            color: DataTypes.STRING
        },
        {
            sequelize,
            modelName: 'Car',
            tableName: 'Cars',
            underscored: false,
            timestamps: true
        }
    )
    return Cars
}
