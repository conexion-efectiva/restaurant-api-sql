const joi = require('joi')

const detailSchema = joi.object({
  productId:joi.number().required()
})


const orderSchema = joi.object({
  userId: joi.number().required(),
  creationDate: joi.string().required(),
  deliverDate: joi.string().required(),
  status: joi.string().required(),
  orderType: joi.string().required(),
  details:joi.array().items(detailSchema)
})

module.exports={orderSchema}