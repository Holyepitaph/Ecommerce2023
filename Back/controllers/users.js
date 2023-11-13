const bcrypt = require('bcrypt')
const router = require('express').Router()

const {User} = require('../models')

router.get('/',async (req, res) =>{
    const user = await User.findAll({})

    res.json(user)
})

router.post('/', async (req, res) =>{
    try {
        const {username, name, password} = req.body
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)
        const newUser ={
          username,
          name,
          passwordHash
        }
        console.log(newUser)
        const user = await User.create(newUser)
        res.json(user)
      } catch(error) {
        return res.status(400).json({ error })
      }   
})

module.exports = router