import mongoose from "mongoose";
import { logger } from "../utils/log4js.js";

import * as dotenv from 'dotenv'
dotenv.config()

export function mongoConnect() {
    const URL = process.env.MONGO_URL
    mongoose.set('strictQuery', true)
    mongoose.connect(URL)
    mongoose.connection.on('open', () => logger.info(`[ Connected to MongoDB ]`))
    mongoose.connection.on('error', (e) => logger.error(e))
}