const usersRoutes = require('./routes/productos.js');
const express = require('express')
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'));
app.use('/', usersRoutes);

app.set('views', './src/views')
app.set('view engine', 'ejs')

const PORT = process.env.PORT || 8082;
const server = app.listen(PORT, (req, res) => console.log(`Escuchando el puerto ${PORT}`))
server.on('error', error => console.log(`Error: ${error}`));