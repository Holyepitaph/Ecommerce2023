const bcrypt = require('bcrypt')
const router = require('express').Router()

const { User, Item,Cart, CartItem, Category} = require('../models')
const { tokenExtractor, isAdmin } = require('../util/middleware')
const CategoryItems = require('../models/categoryItems')



//  Adds new categoryItem with itemId,categoryId
  router.post('/',tokenExtractor,isAdmin, async (req, res) => {
 try{
  const category = await Category.findByPk(req.body.categoryId)
  const item = await Item.findByPk(req.body.itemId)
  const categoryItem = await CategoryItems.create({categoryId: category.id, itemId: item.id})
    res.json(categoryItem)
 }catch{
  return res.status(400).json({error})
 }
  })



//Deletes categoryItem Association
//If admin requires ItemId/CartId
//If User requires ItemId
router.delete('/', tokenExtractor, isAdmin, async (req, res) => {
    try {

      const category = await Category.findByPk(req.body.categoryId)
      const item = await Item.findByPk(req.body.itemId)
      const categoryItem = await CategoryItems.findOne({
        where:{
          categoryId: category.id,
          itemId: item.id
        }
      })
      await categoryItem.destroy()
      return res.status(204).end()
    }
    catch(error) {
      return res.status(400).json({ error })
    }  
  })

module.exports = router