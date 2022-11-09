import cors from 'cors';
import http from 'http';
import express from 'express';
import { Server } from "socket.io";

import { connect } from './persistence/dbConfig.js';
import MessagesFirebaseDAO from './persistence/daos/messagesFirebaseDAO.js';

import messagesRoutes from './routes/messagesRoutes.js';
import productsRoutes from './routes/productsRoutes.js';
import apiRoutes from './routes/apiRoutes.js'

import { normalizeMessages } from './utils/normalize.js'

const app = express();
const messagesDB = new MessagesFirebaseDAO();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/products', productsRoutes);
app.use('/messages', messagesRoutes);
app.use('/api', apiRoutes);

const httpServer = http.createServer(app);
const socketServer = new Server(httpServer, { cors: { origin: "*" } });

socketServer.on('connection', (client) => {
  console.log("Usuario conectado:", client.id);

  messagesDB.getAll().then(messages => {
    const normalizedMessages = normalizeMessages(messages);
    socketServer.sockets.emit("loadMessages", normalizedMessages)
  })

  client.on("newMessage", (data) => {
    messagesDB.save(data);
    messagesDB.getAll().then(messages => {
      const normalizedMessages = normalizeMessages(messages);
      socketServer.sockets.emit("loadMessages", normalizedMessages)
    })
  });
});

const PORT = process.env.PORT || 8080;

try {
  await connect();
  httpServer.listen(PORT, () => console.log(`Escuchando el puerto ${PORT}`));
} catch (error) {
  console.log(error);
}
