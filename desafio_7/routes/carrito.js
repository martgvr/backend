const adminAuth = require('../middlewares/admin')
const { Router } = require('express');
const fs = require('fs');
const router = Router();

// FUNCIONES
async function getCart() {
    try {
        const response = await fs.promises.readFile('./carrito.txt', 'utf-8');
        return JSON.parse(response);
    } catch (e) { return 'Error! No se encontró el archivo' }
}

// ENDPOINTS
router.post('/', adminAuth, (req, res) =>  {
    const cartData = {
        timestamp: Date(Date.now()).toString(),
        productos: [ ]
    }

    getCart()
        .then((data) => {
            data.push({ ...cartData, id: data.length + 1 });
            fs.promises.writeFile('./carrito.txt', JSON.stringify(data));
            res.json({ msg: `Carrito generado con id: ${data.length}` });
        })
        .catch((e) => {
            cartData.id = 1;
            fs.writeFileSync('./carrito.txt', `[${JSON.stringify(cartData)}]`);
            res.json({ msg: 'Carrito generado con id: 1' });
        })
});

router.delete('/:id', (req, res) =>  {
    getCart().then((data) => {
        const cartFind = data.find(cart => cart.id == req.params.id);
        const cartPosition = data.indexOf(cartFind);

        if (cartPosition !== -1) {
            data.splice(cartPosition, 1);
            fs.promises.writeFile('./carrito.txt', JSON.stringify(data));
            res.json({ msg: `Se eliminó el carrito de id: ${req.params.id}` });
        } else {
            res.json({ error: 'Carrito no encontrado' });
        }
    })
        .catch((e) => res.json({ error: 'Error! No se encontró el archivo' }));
});


router.get('/:id/productos', (req, res) =>  {
        getCart().then((data) => {
            const cartFind = data.find(cart => cart.id == req.params.id);
            const cartPosition = data.indexOf(cartFind);
            res.json(cartPosition !== -1 ? data[cartPosition].productos : { error: 'Carrito no encontrado' })
        })
});

router.post('/:id/productos', (req, res) =>  {
    const productData = {
        timestamp: Date(Date.now()).toString(),
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        codigo: req.body.codigo,
        foto: req.body.foto,
        precio: req.body.precio,
        stock: req.body.stock
    }

    getCart().then((data) => {
        const cartFind = data.find(cart => cart.id == req.params.id);
        const cartPosition = data.indexOf(cartFind);

        if (cartPosition !== -1) {
            const productos = data[cartPosition].productos
            productos.push({...productData, id: productos.length});
            fs.promises.writeFile('./carrito.txt', JSON.stringify(data));
            res.json({ msg: `Producto guardado en el carrito ${req.params.id} con id: ${productos.length}` });
        } else {
            res.json({ error: 'Carrito no encontrado' })
        }
    })
});

router.delete('/:id/productos/:id_prod', (req, res) =>  {
    const { id, id_prod } = req.params;

    getCart().then((data) => {
        const cartFind = data.find(cart => cart.id == req.params.id);
        const cartPosition = data.indexOf(cartFind);

        if (cartPosition !== -1) {
            const products = data[cartPosition].productos;
            const productFind = products.find(product => product.id == req.params.id_prod);
            const productPosition = products.indexOf(productFind);

            if (productFind != undefined) {
                products.splice(productPosition, 1);
                fs.promises.writeFile('./carrito.txt', JSON.stringify(data));
                res.json({ msg: `Se eliminó el producto de id: ${id_prod} del carrito ${id}` });
            } else {
                res.json({ error: 'Producto no encontrado' })
            }

        } else {
            res.json({ error: 'Carrito no encontrado' })
        }
    })
});

// EXPORT
module.exports = router;