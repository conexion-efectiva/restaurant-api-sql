const UserRepository = require('../persistence/UserRepository')
const bcrypt = require('bcrypt')

/**
 * @type UserService
 */
let instance = null

class UserService {

  async insert(user) {
    const hash = await bcrypt.hash(user.password, 10)
    user.password = hash
    return await UserRepository.getInstance().insert(user)
  }

  async get(id) {
    const user = await UserRepository.getInstance().getById(id)
    return ({userId: user.userId, email: user.email, name: user.name});
  }

  async getByEmail(email) {
    return await UserRepository.getInstance().getByEmail(email)
  }

  async list() {
    const list = await UserRepository.getInstance().list()
    return list.map(us => ({userId: us.userId, email: us.email, name: us.name}))
  }

  async delete(id) {
    return await UserRepository.getInstance().delete(id)
  }

  async update(user) {
    const existingUser = await UserRepository.getInstance().getById(user.userId)
    if(existingUser != null) {
      const hash = await bcrypt.hash(user.password, 10)
      existingUser.name = user.name 
      existingUser.password = hash
      await UserRepository.getInstance().update(user)
    }
    return {...user, password: ''}
  }

  static getInstance() {
    if (instance == null) {
      instance = new UserService()
    }

    return instance
  }

  async isValidPassword(user, password) {
    const compare = await bcrypt.compare(password, user.password)
    return compare
  }
}

module.exports = UserService