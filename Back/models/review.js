const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Review extends Model {}

Review.init({
    reviewId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  review: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  itemId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'items', key: 'item_id' },
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' },
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'review'
})

module.exports = Review