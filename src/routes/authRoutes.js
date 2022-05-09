const express = require('express')
const passport = require('passport')
const router = express.Router()
const AuthController = require('../controllers/AuthController')
const validateBody = require('../middleware/validateBody')
const { authLoginSchema } = require('../validators/authVaalidator')
const { userSchema } = require('../validators/userValidator')

router.post(
  '/signup',
  validateBody(userSchema),
  passport.authenticate('signup', { session: false }),
  (req, res) => {
    AuthController.getInstance().signup(req, res)
  }
)

router.post('/login', validateBody(authLoginSchema), (req, res, next) => {
  AuthController.getInstance().login(req, res, next)
})

module.exports = router