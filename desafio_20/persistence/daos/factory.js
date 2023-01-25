import CartsFileDAO from '../daos/file/carts.dao.js'
import MessagesFileDAO from '../daos/file/messages.dao.js'
import ProductsFileDAO from '../daos/file/products.dao.js'
import UsersFileDAO from '../daos/file/users.dao.js'

import CartMongoDAO from '../daos/mongo/carts.dao.js'
import MessagesMongoDAO from '../daos/mongo/messages.dao.js'
import ProductsMongoDAO from '../daos/mongo/products.dao.js'
import UsersMongoDAO from '../daos/mongo/users.dao.js'

let cartsDAO, messagesDAO, productsDAO, usersDAO
const varEnv = ''

// switch (process.argv[2]) {
switch (varEnv) {
    case 'file':
        cartsDAO = new CartsFileDAO('./fileDB/carts.json')     
        messagesDAO = new MessagesFileDAO('./fileDB/messages.json')     
        productsDAO = new ProductsFileDAO('./fileDB/users.json')     
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
