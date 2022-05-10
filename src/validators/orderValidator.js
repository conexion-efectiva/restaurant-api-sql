const joi = require('joi')
const ordenSchema = joi.object({
  userId: joi.string().required(),
  creationDate: joi.string().required(),
  devilerDate: joi.string().required(),
  status: joi.string().required(),
  orderType: joi.string().required(),
})

module.exports={ordenSchema}