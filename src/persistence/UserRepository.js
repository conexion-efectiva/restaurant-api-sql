const config = require('./databaseConfig')

const knex = require('knex').knex(config)

let instance = null

class UserRepository {
    async getById(userId) {
        return knex.select('userId', 'name', 'email', 'password')
            .from('users')
            .where({
                userId: userId
            }).first()
    }

    async getByEmail(email) {
        return knex.select('userId', 'name', 'email', 'password')
            .from('users')
            .where({
                email: email
            }).first()
    }

    async list() {
        return knex.select('userId', 'name', 'email', 'password')
            .from('users')
    }

    async insert(user) {
        const ids =  await knex('users')
            .insert(user)
        user.userId = ids[0]
        return user
    }

    async update(user) {
        return await knex('users')
            .where({
                userId: user.userId
            })
            .update(user)
    }

    async delete(userId) {
        return await knex('users')
        .where({
            userId: userId
        }).del()
    }

    /**
     * 
     * @returns {UserRepository}
     */
     static getInstance() {
        if(instance == null) {
            instance = new UserRepository()
        }

        return instance
    }
}

module.exports = UserRepository