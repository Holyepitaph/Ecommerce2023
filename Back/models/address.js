const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Address extends Model {}

//addressType to be shipping or billing

Address.init({
  addressId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  addressType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  street: {
    type: DataTypes.STRING,
    allowNull: false
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false
  },
  zipcode: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false
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
  modelName: 'address'
})

module.exports = Address