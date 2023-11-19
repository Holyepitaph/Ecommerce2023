const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class AddressOrder extends Model {}

AddressOrder.init({
  addressId: {
    type: DataTypes.INTEGER
  },
  orderId: {
    type: DataTypes.INTEGER
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'addressOrder'
})

module.exports = AddressOrder