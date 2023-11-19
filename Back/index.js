const express = require('express')
const app = express()
const { connectToDatabase } = require('./util/db')
const { PORT } = require('./util/config')

const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const addressRouter = require('./controllers/address')
const itemsRouter = require('./controllers/items')
const categoriesRouter = require('./controllers/category')
const reviewsRouter = require('./controllers/reviews')
const ordersRouter = require('./controllers/order')
const cartRouter = require('./controllers/cart')
const cartItemRouter = require('./controllers/cartItem')
const addressOrderRouter = require('./controllers/addressOrder')
const categoryItemRouter = require('./controllers/categoryItem')
const orderItemRouter = require('./controllers/orderItem')

app.use(express.json())

app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/address', addressRouter)
app.use('/api/items', itemsRouter)
app.use('/api/category', categoriesRouter)
app.use('/api/reviews', reviewsRouter)
app.use('/api/orders', ordersRouter)
app.use('/api/cart', cartRouter)
app.use('/api/cartItem', cartItemRouter)
app.use('/api/addressOrder', addressOrderRouter)
app.use('/api/categoryItem', categoryItemRouter)
app.use('/api/orderItem', orderItemRouter)

const start = async () =>{
  await connectToDatabase()
  app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`)
  })
}

start()