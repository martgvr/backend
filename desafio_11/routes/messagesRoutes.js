import { Router } from "express";
import MessagesFirebaseDAO from '../persistence/daos/messagesFirebaseDAO.js';

const router = Router();
const db = new MessagesFirebaseDAO();

router.post('/', async (req, res) => db.save(req.body).then(response => res.json(response)));
router.get('/', async (req, res) => db.getAll().then(response => res.json(response)));
router.get('/:id', async (req, res) => db.getByID(req.params.id).then(response => res.json(response)));
router.delete('/', async (req, res) => db.deleteAll(req.params.id).then(response => res.json(response)));
router.delete('/:id', async (req, res) => db.deleteByID(req.params.id).then(response => res.json(response)));

export default router;
