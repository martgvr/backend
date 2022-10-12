import express from 'express';
import productsRoutes from './routes/productsRoutes.js'
import messagesRoutes from './routes/messagesRoutes.js'

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
});

const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => console.log(`Escuchando el puerto ${PORT}`));