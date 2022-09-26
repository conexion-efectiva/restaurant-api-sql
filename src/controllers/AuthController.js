const passport = require('passport')
const jwt = require('jsonwebtoken')
const UserService = require('../services/UserService')
let instance = null

class AuthController {
  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  signup(req, res) {
    const user = req.user
    user.name = req.body.name
    UserService.getInstance().update(user)
    res.json({
      message: 'Signup successful',
      user: { email: req.user.email },
    })
  }

  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  login(req, res, next) {
    passport.authenticate('login', (err, user) => {
      try {
        if (err || !user) {
          const error = new Error('Error during login')
          return next(error)
        }

        req.login(user, { session: false }, (error) => {
          if (error) {
            return next(error)
          }

          const body = { userId: user.userId, email: user.email }
          const token = jwt.sign({ user: body }, process.env.TOKEN_SECRET)

          return res.json({ token })
        })
      } catch (error) {
        return next(error)
      }
    })(req, res, next)
  }

  /**
   *
   * @returns {AuthController}
   */
  static getInstance() {
    if (instance == null) {
      instance = new AuthController()
    }

    return instance
  }
}

module.exports = AuthController