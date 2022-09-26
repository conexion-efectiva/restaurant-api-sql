const config = require('./databaseConfig')
const OrderDetailRepository = require('./OrderDetailRepository')
const knex = require('knex').knex(config)

let instance = null
class OrderRepository {
    async getById(orderId) {
        const order = await knex.select('orderId', 'userId', 'creationDate', 
        'deliverDate', 'status', 'orderType'
        )
            .from('orders')
            .where({
                orderId: orderId
            }).first()
        if(order == null ){ 
            return null
        }

        const orderDetails = await OrderDetailRepository.getInstance().getByOrderId(orderId)

        order.details = orderDetails;
        
        return order
    }

    async list() {
        const orders = await knex.select('orderId', 'userId', 'creationDate', 
        'deliverDate','status', 'orderType'
        )
        .from('orders')

        for(let i = 0; i < orders.length; i++) {
            const details = OrderDetailRepository.getInstance().getByOrderId(orders[i].orderId)
            orders[i].details = details
        }

        return orders
    }

    async insert(order) {
        const orderIds = await knex('orders')
            .insert({
                creationDate: order.creationDate.substr(0, 10),
                deliverDate: order.deliverDate.substr(0, 10),
                orderType: order.orderType,
                status: order.status,
                userId: order.userId
            })
        order.orderId = orderIds[0]
        
        for(let i = 0; i < order.details.length; i++) {
            let detail = order.details[i]
            detail.orderId = order.orderId
            await OrderDetailRepository.getInstance().insert(detail)
        }

        return order
    }

    async update(order) {
        await OrderDetailRepository.getInstance().deleteByOrderId(order.orderId)
        await knex('orders')
            .where({
                orderId: order.orderId
            })
            .update({
                creationDate: order.creationDate.substr(0, 10),
                deliverDate: order.deliverDate.substr(0, 10),
                orderType: order.orderType,
                status: order.status
            })
        for(let i = 0; i < order.details.length; i++) {
                let detail = order.details[i]
                detail.orderId = order.orderId
                await OrderDetailRepository.getInstance().insert(detail)
        }
    }

    async delete(orderId) {
        await OrderDetailRepository.getInstance().deleteByOrderId(orderId)
        await knex('orders')
        .where({
            orderId: orderId
        }).del()



    }


    /**
     * 
     * @returns {OrderRepository}
     */
    static getInstance() {
        if(instance == null) {
            instance = new OrderRepository()
        }

        return instance
    }
}


module.exports = OrderRepository