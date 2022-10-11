import { Router } from "express";
import '../db/models/messagesModel.js'
import { messages_Config as db } from '../db/dbConfig.js'

const router = Router();

router.get('/', async (req, res) => db.getAll().then(data => res.json(data)));
router.get('/:id', async (req, res) => db.getByID(req.params.id).then(data => res.json(data)));
router.post('/', async (req, res) => db.save(req.body).then(data => res.json(data)));
router.delete('/', async (req, res) => db.deleteAll(req.params.id).then(data => res.json(data)));
router.delete('/:id', async (req, res) => db.deleteByID(req.params.id).then(data => res.json(data)));

export default router;