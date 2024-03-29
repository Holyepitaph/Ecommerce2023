const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class CartItem extends Model {}

CartItem.init({
  cartId:{
    type:DataTypes.INTEGER
  },
  itemId:{
    type: DataTypes.INTEGER
  },
  quantity:{
    type: DataTypes.INTEGER
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'cartItem'
})

module.exports = CartItem