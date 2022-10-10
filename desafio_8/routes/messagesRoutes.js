import { Router } from "express";
import '../db/models/messagesModel.js'
import { messages_Config as db } from '../db/dbConfig.js'

const router = Router();

router.get('/', async (req, res) => {
    db.getAll().then(data => res.json(data))
});

export default router;