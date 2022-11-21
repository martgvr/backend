import express from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'

import userRoutes from './routes/userRoutes.js'
import './persistence/dbConfig.js'

import passport from 'passport'
import './passport/localPassport.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: 'keySession',
    store: MongoStore.create({ mongoUrl: 'mongodb+srv://root:rootmongo123456@cluster0.vpzccsu.mongodb.net/dbPassport?retryWrites=true&w=majority' })
}))

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, (req, res) => console.log(`Escuchando el puerto ${PORT}`))
server.on('error', error => console.log(`Error: ${error}`));