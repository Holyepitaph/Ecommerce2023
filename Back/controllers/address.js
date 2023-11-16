const bcrypt = require('bcrypt')
const router = require('express').Router()

const {Address, User} = require('../models')
const { tokenExtractor, isAdmin } = require('../util/middleware')

//Get all users address if admin
router.get('/',tokenExtractor, isAdmin, async (req, res) => {
    const address = await Address.findAll({ 
      include: [
        {
          model: User,
          attributes: { exclude: ['id','passwordHash', 'admin'] } 
        }
      ]
    })
    res.json(address)
  })

//  Add address to user if user exists and only to matched token to user
  router.post('/',tokenExtractor, async (req, res) => {
    try {
      const user  = await User.findByPk(req.decodedToken.id)
      const address = await Address.create({...req.body,userId: user.id})
      res.json(address)
    } catch(error) {
      return res.status(400).json({ error })
    }
  })



// Changes Address information if admin or address id and user match
router.put('/:address_id', tokenExtractor, async (req, res) => {
  try{
    const address = await Address.findOne({ 
      where: { 
        address_id: req.params.address_id
      }
    })
    const adminCheck = await User.findByPk(req.decodedToken.id)
    if (address) {
      if (!adminCheck.admin && req.decodedToken.id != address.userId) {
        return res.status(401).json({ error: 'operation not permitted' })
      } else if( adminCheck.admin || req.decodedToken.id == address.userId){
        address.addressType = req.body.addressType ? req.body.addressType :address.body.addressType
        address.street = req.body.street ? req.body.street : address.street
        address.city = req.body.city ? req.body.city :address.body.city
        address.state = req.body.state ? req.body.state :address.body.state
        address.zipcode = req.body.zipcode ? req.body.zipcode :address.body.zipcode
        address.country = req.body.country ? req.body.country :address.body.country
        await address.save()
        res.json(address)
      }
    } else {
      res.status(404).end()
    }
  }    catch(error) {
      return res.status(400).json({ error })
    }  
})

//Delete with either admin or id matching address
router.delete('/:address_id', tokenExtractor, async (req, res) => {
    try {
      const address = await Address.findOne({ 
        where: { 
          address_id: req.params.address_id
        }
      })
      const user = await User.findByPk(req.decodedToken.id)
      console.log(user)
      if (address.userId == user.id || user.admin) {
          await address.destroy()
          return res.status(204).end()
        } else{
          return res.status(401).json({ error: 'operation not permitted' })
        }
    }
    catch(error) {
      return res.status(400).json({ error })
    }  
  })

module.exports = router