import { Router } from "express";
import ProductsMongoDAO from '../persistence/daos/productsMongoDAO.js'

const router = Router();
const db = new ProductsMongoDAO();

router.post('/', async (req, res) => db.save(req.body).then(response => res.json(response)));

router.get('/', async (req, res) => { 
    const products = await db.getAll();
    res.json((products.length !== 0) ? { products } : { Error: 'No hay productos almacenados' })
});

router.get('/:id', async (req, res) => db.getByID(req.params.id).then(response => res.json(response)));
router.put('/', async (req, res) => db.update(req.body[0], req.body[1]).then(response => res.json(response)));
router.delete('/', async (req, res) => db.deleteAll(req.params.id).then(response => res.json(response)));
router.delete('/:id', async (req, res) => db.deleteByID(req.params.id).then(response => res.json(response)));

export default router;