const bcrypt = require('bcrypt')
const router = require('express').Router()

const {Order, Address, AddressOrder} = require('../models')
const { tokenExtractor, isAdmin } = require('../util/middleware')


router.get('/',tokenExtractor,isAdmin, async (req, res) => {
  try{
const addressOrder = await AddressOrder.findAll({})
     res.json(addressOrder)
  }catch{
   return res.status(400).json({error})
  }
 
 
   })

//  Adds new addressOrder if user matches  needs to check address by user and type with order
  router.post('/',tokenExtractor, async (req, res) => {
 try{
  const address = await Address.findOne({
    where:{
      id: req.body.addressId
    }
  })
  const order = await Order.findOne({
    where:{
      id: req.body.orderId
    }
  })
  const addressOrder = await AddressOrder.create({addressId: address.id, orderId: order.id})
    res.json(addressOrder)
 }catch(error){
  return res.status(400).json({error})
 }


  })



//Deletes Address Order if user is admin and req includes
// addressId/orderId
router.delete('/', tokenExtractor,isAdmin, async (req, res) => {
    try {

      const addressOrder = await AddressOrder.findOne({
        where:{
          addressId: req.body.addressId,
          orderId: req.body.orderId
        }
      })
      await addressOrder.destroy()
      return res.status(204).end()
    }
    catch(error) {
      return res.status(400).json({ error })
    }  
  })

module.exports = router