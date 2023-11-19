const bcrypt = require('bcrypt')
const router = require('express').Router()

const { User, Item,Cart, CartItem} = require('../models')
const { tokenExtractor, isAdmin } = require('../util/middleware')


//  Adds new Cart Item MTM association needs itemId/quantity...cartId retrieved from token
  router.post('/',tokenExtractor, async (req, res) => {
 try{
  const user = await User.findByPk(req.decodedToken.id)
  const cart = await Cart.findOne({
    where:{
      userId: user.id
    }
  })
  const item = await Item.findByPk(req.body.itemId)
    const cartItem = await CartItem.create({quantity: req.body.quantity, itemId: item.id, cartId: cart.id})
    res.json(cartItem)
 }catch{
  return res.status(400).json({error})
 }


  })

  // Changes Quantity.
  //If Admin requires cartId/ItemId/quantity
  //If User requires ItemId/ Quantity
  router.put('/:itemId',tokenExtractor, async (req, res) => {
    try {

      const user = await User.findByPk(req.decodedToken.id)
      if (user.admin){
        const cart = await Cart.findOne({
          where:{
            userId: req.body.userId
          }
        })
        const item = await Item.findByPk(req.params.itemId)
        const cartItem = await CartItem.findOne({
          where:{
            cartId: cart.id,
            itemId: item.id
          }
        })
        if (cartItem == null){
          return res.status(400).json("User Already has a cart")
        } else{
          cartItem.quantity = req.body.quantity ? req.body.quantity : cartItem.quantity
          await cartItem.save()
          return res.json(cartItem)
        }
      } else {
        const cart = await Cart.findOne({
          where:{
            userId: req.decodedToken.id
          }
        })
        const item = await Item.findByPk(req.params.itemId)
        const cartItem = await CartItem.findOne({
          where:{
            cartId: cart.id,
            itemId: item.id
          }
        })
        if (cartItem == null){
          return res.status(400).json("User Already has a cart")
        } else{
          cartItem.quantity = req.body.quantity ? req.body.quantity : cartItem.quantity
          await cartItem.save()
          return res.json(cartItem)
        }
      }
    } catch(error) {
      return res.status(400).json({ error })
    }
  })



//Deletes Item Cart Association
//If admin requires ItemId/CartId
//If User requires ItemId
router.delete('/:itemId', tokenExtractor, async (req, res) => {
    try {
      const user = await User.findByPk(req.decodedToken.id)
      if (user.admin){
        const cartItem = await CartItem.findOne({
          where:{
            itemId: req.params.itemId,
            cartId: req.body.cartId
          }
        })
        await cartItem.destroy()
        return res.status(204).end()
      } else{
        const cart = await Cart.findOne({
          where:{
            userId: req.decodedToken.id
          }
        })
        const cartItem = await CartItem.findOne({
          where: { 
            itemId: req.params.itemId,
            cartId: cart.id
          }
        })
        if (cartItem == null) {
            return res.status(401).json({ error: 'operation not permitted' })
          } else{
            await cartItem.destroy()
            return res.status(204).end()
          }
      }
    }
    catch(error) {
      return res.status(400).json({ error })
    }  
  })

module.exports = router