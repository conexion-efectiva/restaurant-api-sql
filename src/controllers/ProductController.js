const ProductService = require('../services/ProductServices')

/**
 * @type ProductController
 */
let instance = null

class ProductController {
  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */

  async getList(req, res) {
    const products = await ProductService.getInstance().list()
    res.json(products)
  }

  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */

  async getOne(req, res) {
    const products = await ProductService.getInstance().get(req.params.id)
    if (products == null) {
      res.status(404).json({ message: 'Id no encontrado' })
      return
    }
    res.json(products)
  }

  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */

  async put(req, res) {
    const existentProduct = await ProductService.getInstance().get(req.params.id)
    if (existentProduct == null) {
      res.status(404).json({ message: 'Not found' })
    }

    let product = { ...req.body, _id: req.params.id }
    product = await ProductService.getInstance().update(product)

    res.json(product)
  }

  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */

  async delete(req, res) {
    const existentProduct = await ProductService.getInstance().get(
      req.params.id
    )

    if (existentProduct == null) {
      res.status(404).json({ message: 'Not found' })
    }
    await ProductService.getInstance().delete(req.params.id)
    res.json(existentProduct)
  }
  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */

  async post(req, res) {
    const product = await ProductService.getInstance().insert(req.body)
    res.json(product)
  }
  static getInstance() {
    if (instance == null) {
      instance = new ProductController()
    }

    return instance
  }
}
module.exports = ProductController
