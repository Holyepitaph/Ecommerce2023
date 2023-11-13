const User = require('./user')
const Address = require('./address')
const Cart = require('./cart')

const Category = require('./category')
const Item = require('./item')
const Order = require('./order')
const OrderItem = require('./orderItem')
const Review = require('./review')
const CartItems = require('./cartItems')

User.sync()
Address.sync()
Item.sync()

Review.sync()
Category.sync()

Cart.sync()
Order.sync()

OrderItem.sync()
CartItems.sync()

module.exports = {
    User,
    Address,
    Item,
    Category,
    Review,
    Cart,
    Order,
    CartItems,
    OrderItem,
}