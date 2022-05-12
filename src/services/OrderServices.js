const orderModel = require('../persistence/OrdersModel')

/**
 * @type OrdenService
 */

let instance = null
class OrdenService {
  async get(id) {
    return await orderModel.find({ _id: id })
  }

  async list() {
    return await orderModel.find()
  }

  async update(order) {
    await orderModel.updateOne({ _id: order._id }, order)
    return order
  }

  async insert(order) {
    const result = await orderModel.create(order)
    return result.toObject()
  }

  async delete(id) {
    return await orderModel.deleteOne({ _id: id })
  }

  static getInstance() {
    if (instance == null) {
      instance = new OrdenService()
    }

    return instance
  }
}

module.exports = OrdenService
