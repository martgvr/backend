const usersRoutes = require('./routes/productos.js');
const hbs = require('express-handlebars');
const express = require('express');
const app = express();

const http = require("http");
const { Server: SocketServer } = require("socket.io");
const httpServer = http.createServer(app);
const socketServer = new SocketServer(httpServer);

app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use('/', usersRoutes);

app.set('views', './src/views');
app.set('view engine', 'hbs');

app.engine('hbs', hbs.engine({
    extname: '.hbs',
    defaultLayout: 'layout.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
}));

// ACA

const mensajes = [];

socketServer.on('connection', (client) => {
    console.log("Usuario conectado:", client.id);

    client.emit('loadMessages', mensajes);

    client.on("mensaje", (mensaje) => {
        console.log('mensaje entrante');
        mensajes.push(mensaje);
        // Esto emite un mensaje a todos los clientes

        socketServer.sockets.emit("loadMessages", mensajes);
    });
});

const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => console.log(`Escuchando el puerto ${PORT}`));