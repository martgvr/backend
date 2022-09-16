const { Router } = require('express');
const router = Router();
const fs = require('fs');   

async function getAll() {
    try {
        const response = await fs.promises.readFile('./productos.txt', 'utf-8');
        return JSON.parse(response);
    } catch (e) { return 'Error! No se encontró el archivo' }
}

// ENDPOINTS
router
    // .get('/', (req, res) => getAll().then(data => res.json(data)))
    .get('/', (req, res) => res.render('index', { show: false }));

// EXPORT
module.exports = router;