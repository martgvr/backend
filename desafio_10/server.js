import express from 'express';

import productsRoutes from './routes/productsRoutes.js'
import cartsRoutes from './routes/cartsRoutes.js'
import messagesRoutes from './routes/messagesRoutes.js'

import http from 'http';
import { Server } from "socket.io";

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/products', productsRoutes);
app.use('/carts', cartsRoutes);
app.use('/messages', messagesRoutes);

const httpServer = http.createServer(app);
const socketServer = new Server(httpServer, { cors: { origin: "*" }});

socketServer.on('connection', (client) => {
    console.log("Usuario conectado:", client.id);

    messagesDB.getAll().then(messages => socketServer.sockets.emit("loadMessages", messages));
    productsDB.getAll().then(products => socketServer.sockets.emit("loadProducts", products));

    client.on("newMessage", (data) => {
        messagesDB.save(data);
        messagesDB.getAll().then(messages => socketServer.sockets.emit("loadMessages", messages));
    });

    client.on("newProduct", (data) => {
        productsDB.save(data);
        setTimeout(() => {
            productsDB.getAll().then(products => socketServer.sockets.emit("loadProducts", products));
        }, 500);
    });
});

const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => console.log(`Escuchando el puerto ${PORT}`));