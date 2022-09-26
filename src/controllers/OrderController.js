const OrderService = require('../services/OrderService')

/**
 * @type ProductController
 */

let instance = null

class OrderController {
  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */

  async getList(req, res) {
    const order = await OrderService.getInstance().list()
    res.json(order)
  }

  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */

  async getOne(req, res) {
    const order = await OrderService.getInstance().get(req.params.id)
    if (order == null) {
      res.status(404).json({ message: 'ID no encontrado' })
      return
    }

    res.json(order)
  }

  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async put(req, res) {
    const existOrden = await OrderService.getInstance().get(req.params.id)
    if (existOrden == null) {
      res.status(404).json({ message: 'Not found' })
    }
    let order = { ...req.body, orderId: req.params.id }
    order = await OrderService.getInstance().update(order)
    res.json(order)
  }

  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async delete(req, res) {
    const existOrden = await OrderService.getInstance().get(req.params.id)
    if (existOrden == null) {
      res.status(404).json({ message: 'Not found' })
    }
    await OrderService.getInstance().delete(req.params.id)
    res.json(existOrden)
  }

  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async post(req, res) {
    const order = await OrderService.getInstance().insert(req.body)
    res.json(order)
  }

  static getInstance() {
    if (instance == null) {
      instance = new OrderController()
    }

    return instance
  }
}

module.exports = OrderController
