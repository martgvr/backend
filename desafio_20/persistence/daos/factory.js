import CartsFileDAO from '../daos/file/carts.dao.js'
import MessagesFileDAO from '../daos/file/messages.dao.js'
import ProductsFileDAO from '../daos/file/products.dao.js'
import UsersFileDAO from '../daos/file/users.dao.js'

import CartMongoDAO from '../daos/mongo/carts.dao.js'
import MessagesMongoDAO from '../daos/mongo/messages.dao.js'
import ProductsMongoDAO from '../daos/mongo/products.dao.js'
import UsersMongoDAO from '../daos/mongo/users.dao.js'

import * as dotenv from 'dotenv'
dotenv.config()

let cartsDAO, messagesDAO, productsDAO, usersDAO

switch (process.env.DAO) {
    case 'file':
        cartsDAO = new CartsFileDAO('./fileDB/carts.json')
        messagesDAO = new MessagesFileDAO('./fileDB/messages.json')
        productsDAO = new ProductsFileDAO('./fileDB/products.json')
        usersDAO = new UsersFileDAO('./fileDB/users.json')
        break;

    default:
        cartsDAO = new CartMongoDAO()
        messagesDAO = new MessagesMongoDAO()
        productsDAO = new ProductsMongoDAO()
        usersDAO = new UsersMongoDAO()
        break;
}

export { cartsDAO, messagesDAO, productsDAO, usersDAO }

export default class factorySwitcher {
    static instance
    
    constructor(cartsDAO, messagesDAO, productsDAO, usersDAO) {
        this.cartsDAO = new cartsDAO
        this.messagesDAO = new messagesDAO
        this.productsDAO = new productsDAO
        this.usersDAO = new usersDAO
    }

    getInstance() {
        if (!this.instance) {
            this.instance = new factorySwitcher()
        }
        return this.instance
    }
}

export const selectedFactory = new factorySwitcher(CartsFileDAO('./fileDB/carts.json'), MessagesFileDAO('./fileDB/messages.json'), ProductsFileDAO('./fileDB/products.json'), UsersFileDAO('./fileDB/users.json'))