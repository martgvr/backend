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
router.get('/', (req, res) => res.render('pages/index', { form: true }));
router.get('/productos', (req, res) => getAll().then(data => res.render('pages/index', { form: false, data })));

// EXPORT
module.exports = router;