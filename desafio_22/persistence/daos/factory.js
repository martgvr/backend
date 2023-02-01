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

class factorySwitcher {
    static instance
        
    constructor(DAO) {
        switch (DAO) {
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
    }
        
    getInstance() {
        if (!this.instance) {
            this.instance = new factorySwitcher()
        }
        return this.instance
    }
}

export const setDAO = new factorySwitcher(process.env.DAO === 'file' ? 'file' : '')

export { cartsDAO, messagesDAO, productsDAO, usersDAO }