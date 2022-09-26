const ProductRepository = require('../persistence/ProductRepository')
/**
 * @type ProductService
 */
let instance = null

class ProductService {
  async get(id) {
    return await ProductRepository.getInstance().getById(id)
  }

  async list() {
    return await ProductRepository.getInstance().list()
  }

  async insert(product) {
    const result = await ProductRepository.getInstance().insert(product)
    return result;
  }

  async update(product) {
    await ProductRepository.getInstance().update(product)
    return product
  }

  async delete(id) {
    return await ProductRepository.getInstance().delete(id)
  }

  static getInstance() {
    if (instance == null) {
      instance = new ProductService()
    }

    return instance
  }
}

module.exports = ProductService
