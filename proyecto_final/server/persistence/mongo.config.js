import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import { logger } from '../utils/log4js.js'

import { usersDAO } from './daos/factory.js'
import { cartsDAO } from './daos/factory.js'

import * as dotenv from 'dotenv'
dotenv.config()

async function createAdminUser() {
    const adminExistance = await usersDAO.findByUsername(process.env.ADMIN_USER)

    if (adminExistance === null) {
        await usersDAO.save({
            admin: 1,
            cartID: 0,
            avatar: 'admin.png',
            name: 'Administrador',
            email: process.env.ADMIN_EMAIL,
            username: process.env.ADMIN_USER,
            password: await bcrypt.hash(process.env.ADMIN_PASS, 10),
        })

        await cartsDAO.save({ cartID: 0, products: [], total: 0 })

        logger.info(`[ Admin user created ]`)
    }
}

export async function mongoConnect() {
    const URL = process.env.MONGO_URL
    mongoose.set('strictQuery', true)
    mongoose.connect(URL)
    mongoose.connection.on('open', () => logger.info(`[ Connected to MongoDB ]`))
    mongoose.connection.on('error', (e) => logger.error(e))

    createAdminUser()
}