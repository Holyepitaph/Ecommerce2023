require('dotenv').config()

module.exports = {
  PORT: process.env.PORT || 443,
  DB: process.env.DB,
  LOGIN: process.env.LOGIN,
  PASSWORD: process.env.PASSWORD,
  HOST: process.env.HOST,
  SECRET:process.env.SECRETB
}
