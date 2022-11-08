import mongoose from "mongoose";

import * as dotenv from 'dotenv'
dotenv.config()

export async function connect() {
    const URL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.vpzccsu.mongodb.net/dbFaker?retryWrites=true&w=majority`
    mongoose.connect(URL)
    mongoose.connection.on('open', () => console.log(`Conectado a MongoDB`))
    mongoose.connection.on('error', (e) => console.log(e))
}