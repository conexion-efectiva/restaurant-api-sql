const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const UserService = require('../services/UserService')

function initializeAuthentication() {
  passport.use(
    'signup',
    new localStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email, password, done) => {
        try {
          const user = await UserService.getInstance().insert({ email, password })
          return done(null, user)
        } catch (error) {
          done(error)
        }
      }
    )
  )

  passport.use(
    'login',
    new localStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email, password, done) => {
        try {
          const user = await UserService.getInstance().getByEmail(email)
          if (!user) {
            return done(null, false, { message: 'User not found' })
          }
          const validate = await UserService.getInstance().isValidPassword(user, password)
          if (!validate) {
            return done(null, false, { message: 'Wrong password' })
          }

          return done(null, user, { message: 'Logged in Succesfully' })
        } catch (error) {
          return done(error)
        }
      }
    )
  )

  passport.use(
    new JwtStrategy(
      {
        secretOrKey: process.env.TOKEN_SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      },
      async (token, done) => {
        try {
          return done(null, token.user)
        } catch (error) {
          done(error)
        }
      }
    )
  )

  console.log('Authentication initialized')
}

module.exports = initializeAuthentication