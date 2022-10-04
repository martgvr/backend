const adminAuth = require('../middlewares/admin')
const { Router } = require('express');
const router = Router();

// ENDPOINTS
router.get('/:id', (req, res) =>  {
    const { id } = req.params;
    res.json({msg: 'GET Productos', id})
});

router.post('/', adminAuth, (req, res) =>  res.json({msg: 'POST Productos'}));

router.put('/:id', adminAuth, (req, res) =>  {
    const { id } = req.params;
    res.json({msg: 'PUT Productos', id})
});

router.delete('/:id', adminAuth, (req, res) =>  {
    const { id } = req.params;
    res.json({msg: 'DELETE Productos', id})
});

// EXPORT
module.exports = router;