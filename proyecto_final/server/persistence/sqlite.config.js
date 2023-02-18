import { cartsDAO } from "./daos/factory.js"
import { messagesDAO } from "./daos/factory.js"
import { productsDAO } from "./daos/factory.js"
import { usersDAO } from "./daos/factory.js"

import { cartsModel } from "./models/sqlite/carts.sqlite.model.js"
import { messagesModel } from "./models/sqlite/messages.sqlite.model.js"
import { productsModel } from "./models/sqlite/products.sqlite.model.js"
import { usersModel } from "./models/sqlite/users.sqlite.model.js"

import { logger } from "../utils/log4js.js"

export async function createSQLiteTables() {
    const cartsTable = await cartsDAO.createTable(cartsModel)
    const messagesTable = await messagesDAO.createTable(messagesModel)
    const productsTable = await productsDAO.createTable(productsModel)
    const usersTable = await usersDAO.createTable(usersModel)

    logger.info(`SQLite Tables: [ ${cartsTable.tableName} = ${cartsTable.tableStatus === 1 ? `WORKING` : `ERROR`} | ${messagesTable.tableName} = ${messagesTable.tableStatus === 1 ? `WORKING` : `ERROR`} | ${productsTable.tableName} = ${productsTable.tableStatus === 1 ? `WORKING` : `ERROR`} | ${usersTable.tableName} = ${usersTable.tableStatus === 1 ? `WORKING` : `ERROR`} ]`);
}