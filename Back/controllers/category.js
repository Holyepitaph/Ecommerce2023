const bcrypt = require('bcrypt')
const router = require('express').Router()

const {Category, Item} = require('../models')
const { tokenExtractor, isAdmin } = require('../util/middleware')



//For testing
router.get('/', async (req, res) => {
  try{
    const category = await Category.findAll({ 
    })
    res.json(category)
  
  }
  catch(error) {
    return res.status(400).json({ error })
  }
})


module.exports = router