const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class CategoryItems extends Model {}

CategoryItems.init({
  categoryId: {
    type: DataTypes.INTEGER
  },
  itemId: {
    type: DataTypes.INTEGER
}
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'categoryItems'
})

module.exports = CategoryItems