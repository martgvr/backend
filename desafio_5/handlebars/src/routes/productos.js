const { Router } = require('express');
const router = Router();
const fs = require('fs');   

async function getAll() {
    try {
        const response = await fs.promises.readFile('./src/productos.txt', 'utf-8');
        return JSON.parse(response);
    } catch (e) {
        return { error: true } 
    }
}

// ENDPOINTS
router.get('/', (req, res) => res.render('index', { table: false }));

router.post('/productos', (req, res) => res.send('POST ok')); // Hacer el POST y redirigir a '/'

router.get('/productos', (req, res) => getAll().then(data => res.render('index', { table: true, data })));

// EXPORT
module.exports = router;