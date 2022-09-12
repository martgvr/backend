const express = require('express');
const morgan = require('morgan');
const multer = require('multer')

const app = express();
const usersRoutes = require('./routes/productos.js');

// MORGAN / JSON / STATIC / MULTER / ROUTES
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(multer({ dest: __dirname + '/public/upload' }).single('thumbnail'));

app.use('/api/productos', usersRoutes);

// SERVER DEPLOY
const PORT = 8082;
const server = app.listen(PORT, (req, res) => console.log(`Escuchando el puerto ${PORT}`))

// DEVOLUCION DE ERRORES
server.on('error', error => console.log(`Error: ${error}`));