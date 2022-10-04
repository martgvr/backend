const express = require('express');
const app = express();
const cors = require('cors');

const productosRoutes = require('./routes/productos.js');
const carritoRoutes = require('./routes/carrito.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/productos', productosRoutes);
app.use('/api/carrito', carritoRoutes);

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, (req, res) => console.log(`Escuchando el puerto ${PORT}`))
server.on('error', error => console.log(`Error: ${error}`));