const jwt = require('jsonwebtoken')
const { SECRET } = require('./config.js')
const { User} = require('../models')

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch{
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

const isAdmin = async (req, res, next) => {
  try{
    const user = await User.findByPk(req.decodedToken.id)
    if (!user.admin ) {
      return res.status(401).json({ error: 'operation not permitted' })
    }
  }catch(error){
    return res.status(401).json({ error: 'operation not permitted' })
  }
  next()
}

module.exports = { tokenExtractor, isAdmin }