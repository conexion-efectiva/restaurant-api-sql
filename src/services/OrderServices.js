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

  async update(orden) {
    await orderModel.updateOne({ _id: orden.id }, orden)
    return orden
  }

  async insert(orden) {
    const result = await orderModel.create(orden)
    return result.toObject()
  }

  async delete(id) {
    return await orderModel.delete({ _id: id })
  }

  static getInstance() {
    if (instance == null) {
      instance = new OrdenService()
    }

    return instance
  }
}

module.exports = OrdenService
