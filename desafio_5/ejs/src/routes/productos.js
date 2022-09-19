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

router.post('/productos', (req, res) => {
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

// EXPORT
module.exports = router;