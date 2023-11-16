const bcrypt = require('bcrypt')
const router = require('express').Router()

const {Category, Item} = require('../models')
const { tokenExtractor, isAdmin } = require('../util/middleware')

///Needs to be changed to Many to Many model

//For testing
router.get('/', async (req, res) => {
  try{
    const category = await Category.findAll({ 
      include:Item
    })
    res.json(category)
  
  }
  catch(error) {
    return res.status(400).json({ error })
  }
})

// router.post('/:item_id',tokenExtractor,isAdmin, async (req, res) => {
//   try {
//     const user  = await User.findByPk(req.decodedToken.id)
//     const address = await Address.create({...req.body,userId: user.id})
//     res.json(address)
//   } catch(error) {
//     return res.status(400).json({ error })
//   }
// })


module.exports = router