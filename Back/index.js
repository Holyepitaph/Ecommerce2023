const express = require('express')
const app = express()
const { connectToDatabase } = require('./util/db')
const { PORT } = require('./util/config')
const fileupload = require('express-fileupload')
const cors = require('cors')
const baseUrl = "/public/blogs/nov23/Ecommerce"

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
app.use(
  fileupload({
      createParentPath: true,
  }),
);
const imageRouter = require('./controllers/image')

app.use(cors())

app.use(express.json())
app.use(baseUrl + "/" , express.static('dist'))
app.use(baseUrl + '/images', express.static('controllers/uploads'))
app.use(baseUrl + '/api/users', usersRouter)
app.use(baseUrl + '/api/login', loginRouter)
app.use(baseUrl + '/api/address', addressRouter)
app.use(baseUrl + '/api/items', itemsRouter)
app.use(baseUrl + '/api/category', categoriesRouter)
app.use(baseUrl + '/api/reviews', reviewsRouter)
app.use(baseUrl + '/api/orders', ordersRouter)
app.use(baseUrl + '/api/cart', cartRouter)
app.use(baseUrl + '/api/cartItem', cartItemRouter)
app.use(baseUrl + '/api/addressOrder', addressOrderRouter)
app.use(baseUrl + '/api/categoryItem', categoryItemRouter)
app.use(baseUrl + '/api/orderItem', orderItemRouter)
app.use(baseUrl + '/api/image', imageRouter)

const start = async () =>{
  await connectToDatabase()
  app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`)
  })
}

start()