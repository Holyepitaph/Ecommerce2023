const { Model, DataTypes, NOW } = require('sequelize')

const { sequelize } = require('../util/db')

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  admin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  passwordHash:{
    type: DataTypes.STRING
  },
  email:{
    type: DataTypes.STRING
  },
  phone:{
    type: DataTypes.STRING
  },
  created:{
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'user'
})

module.exports = User