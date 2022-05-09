const mongoose = require('mongoose')

const OrdersSchema = mongoose.Schema({
  userId: String,
  creationDate: String,
  deliverDate: String,
  status: String,
  complete: String,
  oderType: String,
})

const ordersModel = mongoose.model('orden', OrdersSchema)

module.exports = ordersModel
