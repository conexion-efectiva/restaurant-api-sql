const config = require('./databaseConfig')

const knex = require('knex').knex(config)

let instance = null

class ProductRepository {
    async getById(productId) {
        return knex.select('productId', 'name', 'price', 'category')
            .from('products')
            .where({
                productId: productId
            }).first()
    }

    async list() {
        return knex.select('productId', 'name', 'price', 'category')
            .from('products')
    }

    async insert(product) {
        const ids = await knex('products').insert(product)
        product.productId = ids[0]
        return product
    }

    async update(product) {
        return await knex('products')
            .where({
                productId: product.productId
            })
            .update(product)
    }

    async delete(productId) {
        return await knex('products')
            .where({
                productId: productId
            }).del()
    }

    /**
     * 
     * @returns {ProductRepository}
     */
    static getInstance() {
        if(instance == null) {
            instance = new ProductRepository()
        }

        return instance
    }
}

module.exports = ProductRepository