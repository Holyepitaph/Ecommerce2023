// const User = require('./user')
// const Address = require('./address')
// const Cart = require('./cart')

// const Category = require('./category')
// const Item = require('./item')
// const Order = require('./order')
// const OrderItem = require('./orderItem')
// const Review = require('./review')
// const CartItem = require('./cartItems')
// const DeliveryDetails = require('./deliveryDetails')

// User.sync()
// Address.sync()
// Item.sync()

// Review.sync()
// Category.sync()

// Cart.sync()
// Order.sync()

// OrderItem.sync()
// CartItem.sync()

// DeliveryDetails.sync()

// User.hasOne(Cart)
// Cart.belongsTo(User)

// User.hasMany(Address)
// Address.belongsTo(User)

// User.hasMany(Order)
// Order.belongsTo(User)

// Item.hasOne(CartItem)
// CartItem.belongsTo(Item)

// Item.hasOne(OrderItem)
// OrderItem.belongsTo(Item)

// Item.hasMany(Category, {targetKey:'itemId',foreignKey:'itemId'})
// Category.belongsTo(Item)

// Item.hasMany(Review)
// Review.belongsTo(Item)

// Cart.hasMany(CartItem)
// CartItem.belongsTo(Cart)

// Address.belongsToMany(Order,{through: DeliveryDetails})
// Order.belongsToMany(Address,{through: DeliveryDetails})

//Probably need to figure out to many or whatever
module.exports = {
    // User,
    // Address,
    // Item,
    // Category,
    // Review,
    // Cart,
    // Order,
    // CartItem,
    // OrderItem,
    // DeliveryDetails
}