const mongoose = require('mongoose')


const ProductsSchema = mongoose.Schema({
 
  productID:String,
  name: String,
  price: Number,
  
})
const OrdersSchema = mongoose.Schema({
  userId: String,
  creationDate: String,
  deliverDate: String,
  status: String,  
  orderType: String,
  product:[ProductsSchema],
})

const ordersModel = mongoose.model('orden', OrdersSchema)

module.exports = ordersModel
