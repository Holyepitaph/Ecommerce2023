const bcrypt = require('bcrypt')
const router = require('express').Router()

const { User, Item,Cart} = require('../models')
const { tokenExtractor, isAdmin } = require('../util/middleware')

//Get all Carts....needs to be changed for non users and single
router.get('/',tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  if(user.admin){
    const cart = await Cart.findAll({ 
      include: [User, Item]
    })
    return res.json(cart)
  } else {
    const cart = await Cart.findAll({
      where:{userId:req.decodedToken.id},
      include:[Item, User]
    })
    return res.json(cart)
  }

  })

// Creates new cart matched to User if user does not
// Have a cart
  router.post('/',tokenExtractor, async (req, res) => {
    try {
      const user  = await User.findByPk(req.decodedToken.id)
      const check = await Cart.findOne({
        where:{
          userId:user.id
        }
      })
      if(check == null){
        const cart = await Cart.create({userId: user.id},{include:[User]})
        console.log(cart)
        res.json(cart)
      }else{
        return res.json(check)
      }
    } catch(error) {
      return res.status(400).json({ error })
    }
  })



//Delete with either admin or id matching address
router.delete('/:userId', tokenExtractor, async (req, res) => {
    try {
      const user = await User.findByPk(req.decodedToken.id)
      if (user.admin){
        const cart = await Cart.findOne({
          where:{
            userId: req.params.userId
          }
        })
        await cart.destroy()
        return res.status(204).end()
      } else{
        const cart = await Cart.findOne({
          where: { 
            userId: req.decodedToken.id
          }
        })
        if (cart.userId == user.id) {
            await cart.destroy()
            return res.status(204).end()
          } else{
            return res.status(401).json({ error: 'operation not permitted' })
          }
      }
    }
    catch(error) {
      return res.status(400).json({ error })
    }  
  })

module.exports = router