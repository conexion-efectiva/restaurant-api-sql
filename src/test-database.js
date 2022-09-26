require('dotenv').config()


const UserRepository = require('./persistence/UserRepository')


async function insert() {
    const user = {
        email: 'alex.20xx@gmail.com',
        password: '123456'
    } 
    await UserRepository.getInstance().insert(user)
    console.log('usuario insertado exitosamente')
}

async function readOne() {
    const user = await UserRepository.getInstance().list()
    console.log(user)
}

readOne()