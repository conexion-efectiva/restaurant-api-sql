const config = require('./databaseConfig')

const knex = require('knex').knex(config)

let instance = null
class OrderDetailRepository {
    async listByOrderId(orderId) {
        return await knex.select('detailId', 'orderId', 'productId')
            .from('orderDetails')
            .where({
                orderId: orderId
            })
    }

    async getById(detailId) {
        return await knex.select('detailId', 'orderId', 'productId')
        .from('orderDetails')
        .where({
            detailId: detailId
        })
    }

    async list() {
        return await knex.select('detailId', 'orderId', 'productId')
        .from('orderDetails')
    }

    async insert(detail) {
        const detailIds = await knex('orderDetails')
            .insert(detail)
        detail.detailId = detailIds[0]
        return detail
    }

    async update(detail) {
        return await knex('orderDetails')
            .where({
                detailId: detail.detailId
            })
            .update(detail)
    }

    async delete(detailId) {
        return await knex('orderDetails')
        .where({
            detailId: detailId
        }).del()
    }

    async deleteByOrderId(orderId) {
        return await knex('orderDetails')
            .where({
                orderId: orderId
            }).del()
    }


    /**
     * 
     * @returns {OrderDetailRepository}
     */
    static getInstance() {
        if(instance == null) {
            instance = new OrderDetailRepository()
        }

        return instance
    }
}


module.exports = OrderDetailRepository