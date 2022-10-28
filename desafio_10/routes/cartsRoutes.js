import { Router } from "express";
import { mongoCarts as db } from '../db/mongoDB/contenedorMongo.js'

const router = Router();

router.post('/', async (req, res) => db.save(req.body).then(response => res.json(response)));
router.get('/', async (req, res) => db.getAll().then(response => res.json(response)));
router.get('/:id', async (req, res) => db.getByID(req.params.id).then(response => res.json(response)));
router.put('/', async (req, res) => db.update(req.body[0], req.body[1]).then(response => res.json(response)));
router.delete('/', async (req, res) => db.deleteAll(req.params.id).then(response => res.json(response)));
router.delete('/:id', async (req, res) => db.deleteByID(req.params.id).then(response => res.json(response)));

export default router;