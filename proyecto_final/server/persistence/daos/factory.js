import CartMongoDAO from "./mongo/carts.mongo.dao.js"
import MessagesMongoDAO from "./mongo/messages.mongo.dao.js"
import ProductsMongoDAO from "./mongo/products.mongo.dao.js"
import UsersMongoDAO from "./mongo/users.mongo.dao.js"
import OrdersMongoDAO from "./mongo/orders.mongo.dao.js"

import CartsSQLiteDAO from "./sqlite/carts.sqlite.dao.js"
import MessagesSQLiteDAO from "./sqlite/messages.sqlite.dao.js"
import ProductsSQLiteDAO from "./sqlite/products.sqlite.dao.js"
import UsersSQLiteDAO from "./sqlite/users.sqlite.dao.js"
import OrdersSQLiteDAO from "./sqlite/orders.sqlite.dao.js"

import * as dotenv from 'dotenv'
dotenv.config()

let cartsDAO, messagesDAO, productsDAO, usersDAO, ordersDAO

class factorySwitcher {
    static instance

    constructor(DAO) {
        switch (DAO) {
            case 'mongo':
                cartsDAO = new CartMongoDAO()
                messagesDAO = new MessagesMongoDAO()
                productsDAO = new ProductsMongoDAO()
                usersDAO = new UsersMongoDAO()
                ordersDAO = new OrdersMongoDAO()
                break;

            case 'sqlite':
                cartsDAO = new CartsSQLiteDAO()
                messagesDAO = new MessagesSQLiteDAO()
                productsDAO = new ProductsSQLiteDAO()
                usersDAO = new UsersSQLiteDAO()
                ordersDAO = new OrdersSQLiteDAO()
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

export const setDAO = new factorySwitcher(process.env.DAO)

export { cartsDAO, messagesDAO, productsDAO, usersDAO, ordersDAO }