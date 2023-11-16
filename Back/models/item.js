const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Item extends Model {}

Item.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false
  },  
  cost: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false
  },
  highestPrice:{
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  lowestPrice:{
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  stock:{
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  image:{
    type: DataTypes.STRING
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'item'
})

module.exports = Item