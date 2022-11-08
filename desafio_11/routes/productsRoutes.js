import { Router } from "express";
import ProductsMongoDAO from '../persistence/daos/productsMongoDAO.js'

const router = Router();
const db = new ProductsMongoDAO();

router.post('/', async (req, res) => {
    const { cant } = req.query;
    async function createProduct() {
        const response = await (cant ? db.populate(cant) : db.save(req.body))
        return response;
    }
    createProduct().then(response => res.json(response))
});

router.get('/', async (req, res) => db.getAll().then(response => res.json(response)));
router.get('/:id', async (req, res) => db.getByID(req.params.id).then(response => res.json(response)));
router.put('/', async (req, res) => db.update(req.body[0], req.body[1]).then(response => res.json(response)));
router.delete('/', async (req, res) => db.deleteAll(req.params.id).then(response => res.json(response)));
router.delete('/:id', async (req, res) => db.deleteByID(req.params.id).then(response => res.json(response)));

export default router;