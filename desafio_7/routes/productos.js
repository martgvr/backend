const adminAuth = require('../middlewares/admin')
const { Router } = require('express');
const fs = require('fs');
const router = Router();

// FUNCIONES
async function getProducts() {
    try {
        const response = await fs.promises.readFile('./productos.txt', 'utf-8');
        return JSON.parse(response);
    } catch (e) { return 'Error! No se encontró el archivo' }
}

// ENDPOINTS
router
    .get('/', (req, res) => getProducts().then(data => res.json(data)))
    .get('/:id', (req, res) => {
        getProducts().then((data) => {
            const response = data.find(item => item.id == req.params.id);
            res.json(response == undefined ? { error: 'Error! No se encontró el producto' } : response)
        })
            .catch((e) => res.json({ error: 'Error! No se encontró el archivo' }));
    })

router.post('/', adminAuth, (req, res) => {
    const product = {
        title: req.body.title,
        price: Number(req.body.price),
        thumbnail: req.body.thumbnail
    }
    getProducts()
        .then((data) => {
            data.push({ ...product, id: data.length + 1 });
            fs.promises.writeFile('./productos.txt', JSON.stringify(data));
            res.json({ msg: `Producto guardado con id: ${data.length}` });
        })
        .catch((e) => {
            product.id = 1;
            fs.writeFileSync('./productos.txt', `[${JSON.stringify(product)}]`);
            res.json({ msg: 'Producto guardado con id: 1' });
        })
})


router.put('/:id', adminAuth, (req, res) => {
    const product = {
        title: req.body.title,
        price: req.body.price,
        thumbnail: req.body.thumbnail,
        id: Number(req.params.id)
    }

    getProducts().then((data) => {
        const itemFind = data.find(item => item.id == req.params.id);
        const itemPosition = data.indexOf(itemFind);

        if (itemPosition !== -1) {
            data.splice(itemPosition, 1);
            data.push(product)
            fs.promises.writeFile('./productos.txt', JSON.stringify(data));
            res.json({ msg: 'Producto encontrado y modificado' });
        } else {
            res.json({ error: 'Producto no encontrado' });
        }
    })
        .catch((e) => res.json({ error: 'Error! No se encontró el archivo' }));
});

router.delete('/:id', adminAuth, (req, res) => {
    getProducts().then((data) => {
        const itemFind = data.find(item => item.id == req.params.id);
        const itemPosition = data.indexOf(itemFind);

        if (itemPosition !== -1) {
            data.splice(itemPosition, 1);
            fs.promises.writeFile('./productos.txt', JSON.stringify(data));
            res.json({ msg: `Se eliminó el producto de id: ${req.params.id}` });
        } else {
            res.json({ error: 'Producto no encontrado' });
        }
    })
        .catch((e) => res.json({ error: 'Error! No se encontró el archivo' }));
});

// EXPORT
module.exports = router;