const express = require('express')
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('views', './src/views')
app.set('view engine', 'ejs')

const usuarios = [
    {
        nombre: 'Alan',
        apellido: 'Gomez'
    },
    {
        nombre: 'Juan',
        apellido: 'Perez'
    },
    {
        nombre: 'Andres',
        apellido: 'Gutierrez'
    }
]

app.get('/', (req, res) => {
    res.render('pages/index', { usuarios, render: true })
})

const PORT = process.env.PORT || 8082;
const server = app.listen(PORT, (req, res) => console.log(`Escuchando el puerto ${PORT}`))
server.on('error', error => console.log(`Error: ${error}`));