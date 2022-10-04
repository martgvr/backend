const { Router } = require('express');
const router = Router();

// ENDPOINTS
router.post('/', (req, res) =>  res.json({msg: 'POST Carrito'}));
router.delete('/', (req, res) =>  res.json({msg: 'DELETE Carrito'}));
router.get('/', (req, res) =>  res.json({msg: 'GET Carrito'}));

// EXPORT
module.exports = router;