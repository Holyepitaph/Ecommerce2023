const User = require('./user')
const Address = require('./address')
const Item = require('./item')

const Review = require('./review')
const Category = require('./category')

const Cart = require('./cart')
const Order = require('./order')

const OrderItem = require('./orderItem')
const CartItem = require('./cartItems')
const CategoryItems = require('./categoryItems')

const AddressOrder = require('./addressOrder')

const { sequelize } = require('../util/db')
// Not Tested
User.hasMany(Address)
Address.belongsTo(User)
// Not Tested
Item.belongsToMany(Category,{through:CategoryItems})
Category.belongsToMany(Item,{through:CategoryItems})
// Not Tested
User.hasOne(Cart)
Cart.belongsTo(User)
// Not Tested
User.hasMany(Order)
Order.belongsTo(User)
// Not Tested
User.hasMany(Review)
Review.belongsTo(User)
// Not Tested
Item.hasMany(Review)
Review.belongsTo(Item)
// Not Tested
Address.belongsToMany(Order,{through: AddressOrder})
Order.belongsToMany(Address,{through: AddressOrder})
// Not Tested
Item.belongsToMany(Order,{through:OrderItem})
Order.belongsToMany(Item,{through:OrderItem})
// Not Tested
Item.belongsToMany(Cart,{through:CartItem})
Cart.belongsToMany(Item,{through:CartItem})

sequelize.sync()
//Probably need to figure out to many or whatever
module.exports = {
    User,
    Address,
    Item,
    Category,
    Review,
    Cart,
    Order,
    CartItem,
    OrderItem,
    AddressOrder
}