const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class OrderItem extends Model {}

OrderItem.init({
  orderItemId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull:false
  },
  priceAtPurchase: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'orders', key: 'order_id' },
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
  modelName: 'orderItem'
})

module.exports = OrderItem