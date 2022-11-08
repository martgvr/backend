import cors from 'cors';
import http from 'http';
import express from 'express';
import { Server } from "socket.io";

import { connect } from './persistence/dbConfig.js';
import ProductsMongoDAO from './persistence/daos/productsMongoDAO.js'
import MessagesFirebaseDAO from './persistence/daos/messagesFirebaseDAO.js';

import messagesRoutes from './routes/messagesRoutes.js';
import productsRoutes from './routes/productsRoutes.js';
import apiRoutes from './routes/apiRoutes.js'

const app = express();
const productsDB = new ProductsMongoDAO();
const messagesDB = new MessagesFirebaseDAO();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/products', productsRoutes);
app.use('/messages', messagesRoutes);
app.use('/api', apiRoutes);

const httpServer = http.createServer(app);
const socketServer = new Server(httpServer, { cors: { origin: "*" }});

socketServer.on('connection', (client) => {
  console.log("Usuario conectado:", client.id);

  // client.on("newMessage", (data) => {
  //     messagesDB.save(data);
  //     messagesDB.getAll().then(messages => socketServer.sockets.emit("loadMessages", messages));
  // });

  // client.on("newProduct", (data) => {
  //     productsDB.save(data);
  //     setTimeout(() => {
  //         productsDB.getAll().then(products => socketServer.sockets.emit("loadProducts", products));
  //     }, 500);
  // });
});

const PORT = process.env.PORT || 8080;

try {
    await connect();
    httpServer.listen(PORT, () => console.log(`Escuchando el puerto ${PORT}`));
} catch (error) {
    console.log(error);
}
