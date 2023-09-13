import { Router } from 'express';
import messagesControlles from '../controllers/messages.controller.js';
const router = Router();

router.get('/', messagesControlles.getMessages);

export default router;
