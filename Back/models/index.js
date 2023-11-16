const User = require('./user')
const Address = require('./address')
const Item = require('./item')

const Review = require('./review')
const Category = require('./category')

const Cart = require('./cart')
const Order = require('./order')

const OrderItem = require('./orderItem')
const CartItem = require('./cartItems')

const DeliveryDetails = require('./deliveryDetails')

const { sequelize } = require('../util/db')


// User.sync()
// Address.sync()

User.hasMany(Address)
Address.belongsTo(User)

// Item.sync()

// Review.sync()
// Category.sync()

Item.hasMany(Category)
Category.belongsTo(Item)

// Cart.sync()
// Order.sync()

// OrderItem.sync()
// CartItem.sync()

// DeliveryDetails.sync()

User.hasOne(Cart)
Cart.belongsTo(User)



User.hasMany(Order)
Order.belongsTo(User)

Item.hasOne(CartItem)
CartItem.belongsTo(Item)

Item.hasOne(OrderItem)
OrderItem.belongsTo(Item)

User.hasMany(Review)
Review.belongsTo(User)

Item.hasMany(Review)
Review.belongsTo(Item)

Cart.hasMany(CartItem)
CartItem.belongsTo(Cart)

Address.belongsToMany(Order,{through: DeliveryDetails})
Order.belongsToMany(Address,{through: DeliveryDetails})


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
    DeliveryDetails
}