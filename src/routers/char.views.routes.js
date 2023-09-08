import { Router } from 'express';
import messagesControlles from '../controllers/messages.controller.js';
export const router = Router();

router.get('/', messagesControlles.getMessages);
