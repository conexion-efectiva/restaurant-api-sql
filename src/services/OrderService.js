const OrderRepository = require('../persistence/OrderRepository')

/**
 * @type OrderService
 */

let instance = null
class OrderService {
  async get(id) {
    return await OrderRepository.getInstance().getById(id)
  }

  async list() {
    return await OrderRepository.getInstance().list()
  }

  async update(order) {
    await OrderRepository.getInstance().update(order)
    return order
  }

  async insert(order) {
    const result = await OrderRepository.getInstance().insert(order)
    return result
  }

  async delete(id) {
    return await OrderRepository.getInstance().delete(id)
  }

  static getInstance() {
    if (instance == null) {
      instance = new OrderService()
    }

    return instance
  }
}

module.exports = OrderService
