const bcrypt = require('bcrypt')
const router = require('express').Router()

const {Order, User, Address, OrderItem, Item} = require('../models')
const { tokenExtractor, isAdmin } = require('../util/middleware')

//Get all orders for admin 
//Users get matching orders
router.get('/',tokenExtractor, async (req, res) => {
    const user = await User.findByPk(req.decodedToken.id)
    if(user.admin){
      const order = await Order.findAll({ 
        include: [User, Item, Address]
      })
      return res.json(order)
    } else {
      const order = await Order.findAll({
        where:{userId:req.decodedToken.id}, 
        include: [User, Item, Address]
      })
      return res.json(order)
    }


  })

//Adds Order if both User and Address are present
// already for current user
  router.post('/',tokenExtractor, async (req, res) => {
    try {
      const user  = await User.findByPk(req.decodedToken.id)
      const order = await Order.create({...req.body,userId: user.id})
      res.json(order)
    } catch(error) {
      return res.status(400).json({ error })
    }
  })



// Changes status of order with matching :orderId if ADMIN
router.put('/:orderId', tokenExtractor,  async (req, res) => {
  try{
    const user  = await User.findByPk(req.decodedToken.id)
    if(user.admin){
      const order = await Order.findOne({
        where: { 
          id: req.params.orderId
        }
      })
      order.status = req.body.status ? req.body.status :order.status
      await order.save()
      return res.json(order)
    } else{
      const order = await Order.findOne({
        where: { 
          id: req.params.orderId,
          userId: req.decodedToken.id
        }
      })
      order.status = req.body.status ? req.body.status :order.status
      await order.save()
      return res.json(order)
    }


  }    catch(error) {
      return res.status(400).json({ error })
    }  
})

//Delete with either admin or id matching address
router.delete('/:orderId', tokenExtractor, isAdmin, async (req, res) => {
    try {
      const order = await Order.findOne({
        where: { 
          id: req.params.orderId
        }
      })
      await order.destroy()
      return res.status(204).end()
    }
    catch(error) {
      return res.status(400).json({ error })
    }  
  })

module.exports = router