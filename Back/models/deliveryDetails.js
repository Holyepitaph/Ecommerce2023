const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class DeliveryDetails extends Model {}

DeliveryDetails.init({
  addressId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'addresses', key: 'id' },
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'orders', key: 'id' },
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'deliveryDetails'
})

module.exports = DeliveryDetails