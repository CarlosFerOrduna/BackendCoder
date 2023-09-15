import { Router } from 'express';
import userController from '../controllers/users.controller.js';
import auth from '../middleware/auth.middleware.js';

const router = Router();

router.post('/login', auth, userController.login);
router.post('/register', userController.createUser);
router.post('/logout', userController.logout);

export default router;
