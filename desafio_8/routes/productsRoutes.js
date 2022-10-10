import { Router } from "express";
import '../db/models/productsModel.js'
import { products_Config as db } from '../db/dbConfig.js'

const router = Router();

router.get('/', async (req, res) => {
    db.getAll().then(data => res.json(data))
});

export default router;