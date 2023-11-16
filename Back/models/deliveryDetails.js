const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class DeliveryDetails extends Model {}

DeliveryDetails.init({
  addressId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'addresses', key: 'address_id' },
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'orders', key: 'order_id' },
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'deliveryDetails'
})

module.exports = DeliveryDetails