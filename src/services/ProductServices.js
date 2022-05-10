const ProductsModel = require('../persistence/ProductsModel')
/**
 * @type ProductService
 */
let instance = null

class ProductService {
  async get(id) {
    return await ProductsModel.find({ _id: id })
  }

  async list() {
    return await ProductsModel.find()
  }

  async insert(product) {
    const result = await ProductsModel.create(product)
    return result.toObject()
  }

  async update(product) {
    await ProductsModel.updateOne({ _id: product._id }, product)
    return product
  }

  async delete(id) {
    return await ProductsModel.deleteOne({ _id: id })
  }

  static getInstance() {
    if (instance == null) {
      instance = new ProductService()
    }

    return instance
  }
}

module.exports = ProductService
