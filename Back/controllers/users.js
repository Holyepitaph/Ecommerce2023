const bcrypt = require('bcrypt')
const router = require('express').Router()

const {User, Address, Order, Cart} = require('../models')
const { tokenExtractor, isAdmin } = require('../util/middleware')
const saltRounds = 11

// **Production for admin only with token check**
router.get('/',tokenExtractor, isAdmin, async (req, res) =>{
    const user = await User.findAll({
      include:[Address, Order, Cart]
    })

    res.json(user)
})

// Creates new Users with password encrypt
router.post('/', async (req, res) =>{
    try {
        const {username, name, password} = req.body
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

//If admin Changes username admin status 
//If user Changes email / Phone / Pass
router.put('/:username', tokenExtractor, async (req, res) => {
  const user = await User.findOne({ 
    where: { 
      username: req.params.username
    }
  })
  const adminCheck = await User.findByPk(req.decodedToken.id)
  if (user) {
    if (!adminCheck.admin) {
      if(req.decodedToken.id == user.id){
        user.email = req.body.email ? req.body.email : user.email
        user.phone = req.body.phone ? req.body.phone : user.phone
        if(req.body.password){
          const passwordHash = await bcrypt.hash(req.body.password, saltRounds)
          user.passwordHash = passwordHash
        }
        await user.save()
        res.json(user)
      } else{
        return res.status(401).json({ error: 'operation not permitted' })
      }
    } else if( adminCheck.admin){
      user.admin = req.body.admin
      user.email = req.body.email ? req.body.email : user.email
      user.phone = req.body.phone ? req.body.phone : user.phone
      if(req.body.password){
        const passwordHash = await bcrypt.hash(req.body.password, saltRounds)
        user.passwordHash = passwordHash
      }
      await user.save()
      res.json(user)
    }

  } else {
    res.status(404).end()
  }
})

//Deletes if user is an admin or is the same user as being deleted
router.delete('/:username', tokenExtractor, async (req, res) => {
const user = await User.findByPk(req.decodedToken.id)
if (req.params.username.toLowerCase() == user.username.toLowerCase() || user.admin) {
    const byebye = await User.findOne({ 
      where: { 
        username: req.params.username
      }
    })
    await byebye.destroy()
    return res.status(204).end()
  } else{
    return res.status(401).json({ error: 'operation not permitted' })
  }
})

module.exports = router