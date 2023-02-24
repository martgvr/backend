import { cartsDAO } from "./daos/factory.js"
import { messagesDAO } from "./daos/factory.js"
import { productsDAO } from "./daos/factory.js"
import { usersDAO } from "./daos/factory.js"

import { cartsModel } from "./models/sqlite/carts.sqlite.model.js"
import { messagesModel } from "./models/sqlite/messages.sqlite.model.js"
import { productsModel } from "./models/sqlite/products.sqlite.model.js"
import { usersModel } from "./models/sqlite/users.sqlite.model.js"

import bcrypt from 'bcrypt'
import { logger } from "../utils/log4js.js"

async function createAdminUser() {
    const adminExistance = await usersDAO.findByUsername(process.env.ADMIN_USER)

    if (adminExistance === undefined) {
        await usersDAO.save({
            admin: 1,
            cartID: 0,
            avatar: 'admin.jpg',
            name: 'Administrador',
            email: process.env.ADMIN_EMAIL,
            username: process.env.ADMIN_USER,
            password: await bcrypt.hash(process.env.ADMIN_PASS, 10),
        })

        await cartsDAO.save({ cartID: 0, products: [], total: 0 })

        logger.info(`[ Admin user created ]`)
    }
}

export async function createSQLiteTables() {
    const cartsTable = await cartsDAO.createTable(cartsModel)
    const messagesTable = await messagesDAO.createTable(messagesModel)
    const productsTable = await productsDAO.createTable(productsModel)
    const usersTable = await usersDAO.createTable(usersModel)

    logger.info(`SQLite Tables: [ ${cartsTable.tableName} = ${cartsTable.tableStatus === 1 ? `WORKING` : `ERROR`} | ${messagesTable.tableName} = ${messagesTable.tableStatus === 1 ? `WORKING` : `ERROR`} | ${productsTable.tableName} = ${productsTable.tableStatus === 1 ? `WORKING` : `ERROR`} | ${usersTable.tableName} = ${usersTable.tableStatus === 1 ? `WORKING` : `ERROR`} ]`);

    createAdminUser()
}