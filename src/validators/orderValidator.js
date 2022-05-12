const joi = require('joi')


const ProductsSchema = joi.object({
 
  productID:joi.string().required(),
  name: joi.string().required(),
  price:joi.number().required(),
  
})
const ordenSchema = joi.object({
  userId: joi.string().required(),
  creationDate: joi.string().required(),
  deliverDate: joi.string().required(),
  status: joi.string().required(),
  orderType: joi.string().required(),
  product:joi.array().items(ProductsSchema)
})

module.exports={ordenSchema}