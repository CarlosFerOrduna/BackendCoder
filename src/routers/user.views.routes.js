import { Router } from 'express';

const router = Router();

router.get('/login', (req, res) => {
    return res.render('login', { title: 'form-login' });
});

router.get('/register', (req, res) => {
    return res.render('register', { title: 'form-register' });
});

export default router;
