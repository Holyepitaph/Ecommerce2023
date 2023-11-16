const bcrypt = require('bcrypt')
const router = require('express').Router()

const jwt = require('jsonwebtoken')
const {Item, User} = require('../models')
const { tokenExtractor, isAdmin } = require('../util/middleware')
const { SECRET } = require('../util/config.js')



//Find All Items
router.get('/', async (req, res) =>{
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
      const user = await User.findByPk(req.decodedToken.id)
      console.log(user.admin)
      if(user.admin){
        const item = await Item.findAll({})
        return res.json(item)
      }
      if (!user.admin) {
        const item = await Item.findAll({
            attributes:{ exclude:['cost', 'highestPrice', 'lowestPrice']}
          })
        return res.json(item)
      }
    } catch{
        const item = await Item.findAll({
            attributes:{ exclude:['cost', 'highestPrice', 'lowestPrice']}
          })
        return res.json(item)
    }
  } else {
    const item = await Item.findAll({
        attributes:{ exclude:['cost', 'highestPrice', 'lowestPrice']}
      })
    return res.json(item)
  }
})

//Find Single Item
router.get('/:itemId', async (req, res) =>{
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      try {
        req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
        const user = await User.findByPk(req.decodedToken.id)
        console.log(user.admin)
        if(user.admin){
          const item = await Item.findOne({           
             where: { 
              id: req.params.itemId
          }})
          return res.json(item)
        }
        if (!user.admin) {
          const item = await Item.findOne({            
            where: { 
              id: req.params.itemId
          },
              attributes:{ exclude:['cost', 'highestPrice', 'lowestPrice']}
            })
          return res.json(item)
        }
      } catch{
          const item = await Item.findOne({
            where: { 
              id: req.params.itemId
              },
              attributes:{ exclude:['cost', 'highestPrice', 'lowestPrice']}
            })
          return res.json(item)
      }
    } else {
      const item = await Item.findOne({
        where: { 
          id: req.params.itemId
          },
          attributes:{ exclude:['cost', 'highestPrice', 'lowestPrice']}
        })
      return res.json(item)
    }
  })


//New Item
router.post('/',tokenExtractor, isAdmin, async (req, res) =>{
    try {
        const newItem = req.body
        const item = await Item.create(newItem)
        res.json(item)
      } catch(error) {
        return res.status(400).json({ error })
      }   
})

//If admin Changes info denies everyone else
router.put('/:itemId', tokenExtractor,isAdmin, async (req, res) => {
    try{
        const item = await Item.findOne({ 
            where: { 
              id: req.params.itemId
            }
          })
        item.name = req.body.name ? req.body.name : item.name
        item.description = req.body.description ? req.body.description : item.description
        item.price = req.body.price ? req.body.price : item.price
        item.cost = req.body.cost ? req.body.cost : item.cost
        item.highestPrice = req.body.highestPrice ? req.body.highestPrice : item.highestPrice
        item.lowestPrice = req.body.lowestPrice ? req.body.lowestPrice : item.lowestPrice
        item.stock = req.body.stock ? req.body.stock : item.stock
        item.image = req.body.image ? req.body.image : item.image
        await item.save()
        res.json(item)
    }catch(error) {
        return res.status(400).json({ error })
      }   

})

//Deletes if user is an admin
router.delete('/:itemId', tokenExtractor,isAdmin, async (req, res) => {
const item = await Item.findByPk(req.params.itemId)
if (item) {
    await item.destroy()
    return res.status(204).end()
  } else{
    return res.status(401).json({ error: 'Item not found' })
  }
})

module.exports = router