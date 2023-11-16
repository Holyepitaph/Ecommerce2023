const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Order extends Model {}

Order.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dateOfStatus: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue:DataTypes.NOW
  },
  totalSale: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  totalCost:{
    type: DataTypes.INTEGER,
    defaultValue:0
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' },
  },
  addressId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'addresses', key: 'id' },
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'order'
})

module.exports = Order