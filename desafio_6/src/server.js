const hbs = require('express-handlebars');
const express = require('express');
const app = express();
const fs = require('fs');

const http = require("http");
const { Server: SocketServer } = require("socket.io");
const httpServer = http.createServer(app);
const socketServer = new SocketServer(httpServer);

app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));

app.set('views', './src/views');
app.set('view engine', 'hbs');

app.engine('hbs', hbs.engine({
    extname: '.hbs',
    defaultLayout: 'layout.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
}));

const mensajes = [];

socketServer.on('connection', (client) => {
    console.log("Usuario conectado:", client.id);

    client.emit('loadMessages', mensajes);
    getAll().then(data => client.emit('loadProducts', data))

    client.on("mensaje", (mensaje) => {
        mensajes.push(mensaje);
        socketServer.sockets.emit("loadMessages", mensajes);
    });

    client.on('actualizarProductos', () => {
        setTimeout(() => {
            getAll().then(data => socketServer.sockets.emit('loadProducts', data))
        }, 100);
    })
});

app.get('/', (req, res) => getAll().then(data => res.render('index', { data })));

app.post('/productos', (req, res) => {
    const product = {
        title: req.body.title,
        price: Number(req.body.price),
        thumbnail: req.body.thumbnail
    }
    getAll()
        .then((data) => {
            data.push({ ...product, id: data.length + 1 });
            fs.promises.writeFile('./src/productos.txt', JSON.stringify(data));
            res.redirect('/');
        })
        .catch((e) => {
            product.id = 1;
            fs.writeFileSync('./src/productos.txt', `[${JSON.stringify(product)}]`);
            res.redirect('/');
        })
});

async function getAll() {
    try {
        const response = await fs.promises.readFile('./src/productos.txt', 'utf-8');
        return JSON.parse(response);
    } catch (e) {
        return { error: true }
    }
}

const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => console.log(`Escuchando el puerto ${PORT}`));