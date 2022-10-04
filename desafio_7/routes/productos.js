const { Router } = require('express');
const router = Router();

// ENDPOINTS
router.get('/:id', (req, res) =>  {
    const { id } = req.params;
    res.json({msg: 'GET Productos', id})
});

// PONER MIDDLEWARE ADMIN
router.post('/', (req, res) =>  res.json({msg: 'POST Productos'}));

router.put('/:id', (req, res) =>  {
    const { id } = req.params;
    res.json({msg: 'PUT Productos', id})
});

router.delete('/:id', (req, res) =>  {
    const { id } = req.params;
    res.json({msg: 'DELETE Productos', id})
});

// EXPORT
module.exports = router;