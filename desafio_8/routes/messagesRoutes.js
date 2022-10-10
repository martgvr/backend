import { Router } from "express";
import { sqlite as db } from '../db/dbConfig.js'
import '../db/models/messagesModel.js'

const router = Router();

export default router;