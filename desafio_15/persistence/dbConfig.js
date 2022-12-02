import mongoose from "mongoose";

import * as dotenv from 'dotenv'
dotenv.config()

const URL = process.env.MONGO_URL

mongoose.connect(URL)
mongoose.connection.on('open', () => console.log(`[ Connected to MongoDB ]`))
mongoose.connection.on('error', (e) => console.log(e))
