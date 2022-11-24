import mongoose from "mongoose";

import * as dotenv from 'dotenv'
dotenv.config()

const URL = process.env.MONGO_URL

console.log('Conectando a MongoDB...');

mongoose.connect(URL)
mongoose.connection.on('open', () => console.log(`Conectado a MongoDB`))
mongoose.connection.on('error', (e) => console.log(e))
