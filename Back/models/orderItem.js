const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class OrderItem extends Model {}

OrderItem.init({
  quantity: {
    type: DataTypes.INTEGER,
    allowNull:false
  },
  priceAtPurchase: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  orderId:{
    type: DataTypes.INTEGER
  },
  itemId:{
    type:DataTypes.INTEGER
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'orderItem'
})

module.exports = OrderItem