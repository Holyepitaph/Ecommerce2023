const express = require('express')
const app = express()
const { connectToDatabase } = require('./util/db')
const { PORT } = require('./util/config')

const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const addressRouter = require('./controllers/address')
const itemsRouter = require('./controllers/items')
const categoriesRouter = require('./controllers/category')

app.use(express.json())

app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/address', addressRouter)
app.use('/api/items', itemsRouter)
app.use('/api/category', categoriesRouter)

const start = async () =>{
  await connectToDatabase()
  app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`)
  })
}

start()