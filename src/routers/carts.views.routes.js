import { Router } from 'express';
import cartController from '../controllers/carts.controller.js';

const router = Router();

router.get('/:cid', cartController.getViewCartById);

export default router;
