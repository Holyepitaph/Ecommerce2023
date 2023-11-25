const bcrypt = require('bcrypt')
const router = require('express').Router()

const { User, Item,Cart, CartItem, Category, OrderItem, Order} = require('../models')
const { tokenExtractor, isAdmin } = require('../util/middleware')
const CategoryItems = require('../models/categoryItems')



//  Creates new orderItem needs orderId,itemId,quantity
//  this checks token against order to confirm order is theirs
///////Consider adding an admin forced change 
router.post('/',tokenExtractor, async (req, res) => {
 try{
  const order = await Order.findByPk(req.body.orderId)
  const item = await Item.findByPk(req.body.itemId)
  if (order.userId == req.decodedToken.id){
    const orderItem = await OrderItem.create({orderId: order.id, itemId: item.id, priceAtPurchase: item.price, quantity: req.body.quantity})
    res.json(orderItem)
  } else{
    return res.status(400).json("Something Went Wrong")
  }
 }catch(error){
  return res.status(400).json({error})
 }
  })



//Deletes Item Cart Association
//If admin requires ItemId/CartId
////////Consider changing to allow matched user to delete
router.delete('/', tokenExtractor, isAdmin, async (req, res) => {
    try {

      const order = await Order.findByPk(req.body.orderId)
      const item = await Item.findByPk(req.body.itemId)
      const orderItem = await OrderItem.findOne({
        where:{
          orderId: order.id,
          itemId: item.id
        }
      })
      await orderItem.destroy()
      return res.status(204).end()
    }
    catch(error) {
      return res.status(400).json({ error })
    }  
  })

module.exports = router