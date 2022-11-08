import { Router } from "express";
import { mockProducts } from '../utils/mocks.js'

const router = Router();

router.get('/productos-test', (req, res) => {
    const { quantity } = req.query;
    res.json({ productos: mockProducts(quantity) })
})

export default router;
