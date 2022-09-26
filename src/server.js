const express = require('express')
const app = express()
const port = process.env.PORT || 8080
require('dotenv').config()
const initializeAuthentication = require('./auth/authentication')


app.use(express.json())


const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes')
const orderRoutes=require('./routes/orderRoutes')

initializeAuthentication()
app.use('/api',orderRoutes)
app.use('/api', authRoutes)
app.use('/api', userRoutes)
app.use('/api', productRoutes)

app.listen(port, () => {
  console.log('App listening on port ', port)
})