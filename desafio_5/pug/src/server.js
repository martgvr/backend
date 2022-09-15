const express = require('express')
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('views', './src/views')
app.set('view engine', 'pug')

app.get('/', (req, res) => {
    res.render('index', { mensaje: 'Bienvenido', nombre: 'Juan', apellido: 'Eandi', deporte: 'Ciclismo', render: true })
})

const PORT = process.env.PORT || 8082;
const server = app.listen(PORT, (req, res) => console.log(`Escuchando el puerto ${PORT}`))
server.on('error', error => console.log(`Error: ${error}`));