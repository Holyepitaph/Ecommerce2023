const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class CartItem extends Model {}

CartItem.init({
  cartItemId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue:1
  },
  cartId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'carts', key: 'cart_id' },
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'cartItem'
})

module.exports = CartItem