import { Router } from 'express'
import passport from 'passport'
import userController from '../controllers/users.controller.js'
import { authToken } from '../utils/jwt.util.js'

const router = Router()

router.post(
    '/login',
    passport.authenticate('login', { failureRedirect: '/failLogin' }),
    userController.login
)
router.get('/failLogin', userController.failLogin)
router.post(
    '/register',
    passport.authenticate('register', { failureRedirect: '/failRegister' }),
    userController.createUser
)
router.get('/failRegister', userController.failRegister)
router.post('/logout', userController.logout)
router.post('/restore', userController.updateUser)
router.get(
    '/github',
    passport.authenticate('github', { scope: ['user:email'] }),
    userController.github
)
router.get(
    '/githubcallback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    userController.githubCallBack
)
router.get('/current', authToken, userController.current)

export default router
