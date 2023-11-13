require('dotenv').config()

module.exports = {
  PORT: process.env.PORT || 3001,
  DB: process.env.DB,
  USER: process.env.USER,
  PASSWORD: process.env.PASSWORD,
  HOST: process.env.HOST,
  SECRET:process.env.SECRETB
}
