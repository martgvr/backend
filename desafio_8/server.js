import express from 'express';
import productsRoutes from './routes/productsRoutes.js'
import messagesRoutes from './routes/messagesRoutes.js'

import { messages_Config as messagesDB } from './db/dbConfig.js'
import { products_Config as productsDB } from './db/dbConfig.js'
import http from 'http';
import { Server } from "socket.io";

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/products', productsRoutes);
app.use('/messages', messagesRoutes);

const httpServer = http.createServer(app);
const socketServer = new Server(httpServer, { cors: { origin: "*" }});

socketServer.on('connection', (client) => {
    console.log("Usuario conectado:", client.id);

    messagesDB.getAll().then(messages => socketServer.sockets.emit("loadMessages", messages));
    productsDB.getAll().then(products => socketServer.sockets.emit("loadProducts", products));

    // CLIENTE EMITE
    client.on("newMessage", (data) => {
        console.log(data);
        messagesDB.save(data);
        messagesDB.getAll().then(messages => socketServer.sockets.emit("loadMessages", messages));
    });
});

const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => console.log(`Escuchando el puerto ${PORT}`));