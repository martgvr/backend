const fs = require('fs');
const express = require('express');
const app = express();
const PORT = 8080;

const server = app.listen(PORT, (req, res) => console.log(`Escuchando el puerto: ${PORT}`));

// DEVOLUCION DE ERRORES

server.on('error', error => console.log(`Error: ${error}`));

// FUNCIONES

class Contenedor {
    constructor(file) {
        this.file = file;
    }

    async getAll() {
        const response = await fs.promises.readFile(this.file, 'utf-8')
        return JSON.parse(response)
    }
}

const producto1 = new Contenedor('./productos.txt');

// ENDPOINT GET

app.get('/productos', (req, res) => {
    producto1.getAll().then((response) => res.send(response))
});

app.get('/productoRandom', (req, res) => {
    const randNumber = Math.floor(Math.random() * 3);
    producto1.getAll().then((response) => res.send(response[randNumber]))
});