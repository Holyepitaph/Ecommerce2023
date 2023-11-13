const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Category extends Model {}

Category.init({
    categoryId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  itemId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'items', key: 'item_id' },
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'category'
})

module.exports = Category