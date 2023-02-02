import os from 'os'
import cluster from 'cluster'
import express from 'express'

import './utils/logHeader.js'
import { logger } from "./utils/log4js.js";
import { mongoConnect } from './persistence/db.config.js'

import graphqlHTTP from './graphql/schemas.graphql.js'

const procNum = os.cpus().length
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', graphqlHTTP)

const PORT = process.env.PORT || 8080

function createServer() {
    const server = app.listen(PORT, (req, res) => { 
        logger.info(`[ Listening ${PORT == 8080 ? 'default':'custom'} port: ${PORT} | Mode: ${process.env.CLUSTER == 'true' ? 'cluster' : 'fork'} | Process: ${process.pid} | DAO: ${process.env.DAO || 'mongoDB'} ]`)
    })
    server.on('listening', () => process.env.DAO !== 'file' && mongoConnect())
    server.on('error', error => logger.error(`Error: ${error}`));
}

if (process.env.CLUSTER == 'true') {
    if (cluster.isPrimary) {
        logger.info(`[ Proceso maestro: ${process.pid} ]`)
        for (let i = 0; i < procNum; i++) { cluster.fork() }
        cluster.on('exit', () => cluster.fork())
    } else {
        createServer()
    }   
} else {
    createServer()
}