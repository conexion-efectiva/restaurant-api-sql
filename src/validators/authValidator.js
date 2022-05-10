const joi = require('joi')

const authLoginSchema = joi.object({
  email: joi.string().required(),
  password: joi.string().required()
})

module.exports = { authLoginSchema }