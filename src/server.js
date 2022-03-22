const express = require('express')
const app = express()
const port = process.env.PORT || 8080
const initializeAuthentication = require('./auth/initializeAuthentication')
const jwtAuthenticationMiddleware = require('./middleware/jwtAuthenticationMiddleware')

app.use(express.json())

const mongoose = require('mongoose')
require('dotenv').config()

const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes')

main()
  .then(() => console.log('Base de datos conectada'))
  .catch((err) => console.log(err))

async function main() {
  await mongoose.connect(process.env.DB_MONGO)
}

initializeAuthentication()

app.use('/api', authRoutes)
app.use('/api', userRoutes)
app.use('/api', jwtAuthenticationMiddleware, productRoutes)

app.listen(port, () => {
  console.log('App listening on port ', port)
})