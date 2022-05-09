const joi = require('joi')

const ProductSchema = joi.object({
  name: joi.string().required(),
  price: joi.number().required(),
  category: joi.string().required(),
})

module.exports = { ProductSchema }
