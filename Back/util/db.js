const Sequelize = require('sequelize')
const { DB, USER, PASSWORD, HOST } = require('./config')

const sequelize = new Sequelize(DB, USER,
    PASSWORD, {
        host: HOST,
        dialect: "mysql",
        operationsAliases: false,
        pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
        }
    })
    
    const connectToDatabase = async () => {
      try {
        await sequelize.authenticate()
        console.log('connected to the database')
      } catch (err) {
        console.log('failed to connect to the database')
        return process.exit(1)
      }
    
      return null
    }
    
    
    module.exports = { connectToDatabase, sequelize }