const adminAuth = require('../middlewares/admin')
const { Router } = require('express');
const router = Router();

// ENDPOINTS
router.post('/', adminAuth, (req, res) =>  {
    res.json({msg: 'POST Carrito'})
});

router.delete('/:id', (req, res) =>  {
    const { id } = req.params;
    res.json({msg: 'DELETE Carrito', id})
});


router.get('/:id/productos', (req, res) =>  {
    const { id } = req.params;
    res.json({msg: 'GET Carrito', id})
});

router.post('/:id/productos', (req, res) =>  {
    const { id } = req.params;
    res.json({msg: 'POST Carrito', id})
});

router.delete('/:id/productos/:id_prod', (req, res) =>  {
    const { id, id_prod } = req.params;
    res.json({msg: 'DELETE Carrito', id, id_prod})
});

// EXPORT
module.exports = router;