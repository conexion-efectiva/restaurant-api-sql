const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
  name: String,
  price: Number,
  category: String,
})

const ProductsModel = mongoose.model('products', ProductSchema)

module.exports = ProductsModel
