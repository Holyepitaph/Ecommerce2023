const bcrypt = require('bcrypt')
const router = require('express').Router()

const {Category, Item} = require('../models')
const { tokenExtractor, isAdmin } = require('../util/middleware')

//Retrieves all categories with linked items
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

//Only needs to confirm admin status and create a category
router.post('/',tokenExtractor,isAdmin, async (req, res) => {
  try {
    const category = await Category.create({categoryDescription: req.body.categoryDescription,categoryName:req.body.categoryName})
    res.json(category)
  } catch(error) {
    return res.status(400).json({ error })
  }
})

// Changes single category with Params categoryId
// categoryName/ categoryDescription
//Admin Only
router.put('/:categoryId',tokenExtractor,isAdmin, async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.categoryId)
    category.categoryName = req.body.categoryName ? req.body.categoryName : category.categoryName
    category.categoryDescription = req.body.categoryDescription ? req.body.categoryDescription : category.categoryDescription
    await category.save()
    res.json(category)
  } catch(error) {
    return res.status(400).json({ error })
  }
})

//Deletes Category if user is an admin
router.delete('/:categoryId', tokenExtractor,isAdmin, async (req, res) => {
  const category = await Category.findByPk(req.params.categoryId)
  if (category) {
      await category.destroy()
      return res.status(204).end()
    } else{
      return res.status(401).json({ error: 'Item not found' })
    }
  })

module.exports = router