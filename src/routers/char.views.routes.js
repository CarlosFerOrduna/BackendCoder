import { Router } from 'express';
import messagesControlles from '../controllers/messages.controller.js';
import { authToken } from '../utils/jwt.util.js';
const router = Router();

router.get('/', authToken, messagesControlles.getMessages);

export default router;
