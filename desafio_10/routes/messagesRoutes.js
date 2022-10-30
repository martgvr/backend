import { Router } from "express";
import MessagesFirebaseDAO from '../persistence/daos/messagesFirebaseDAO.js';

const router = Router();
const db = new MessagesFirebaseDAO();

// CREATE
router.post('/', async (req, res) => db.save(req.body).then(response => res.json(response)));

// READ
router.get('/', async (req, res) => db.getAll().then(response => res.json(response)));

// UPDATE

// DELETE

export default router;
