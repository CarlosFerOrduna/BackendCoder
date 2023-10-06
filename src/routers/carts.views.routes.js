import { Router } from 'express';
import cartController from '../controllers/carts.controller.js';
import { authToken } from '../utils/jwt.util.js';

const router = Router();

router.get('/:cid', authToken, cartController.getViewCartById);

export default router;
