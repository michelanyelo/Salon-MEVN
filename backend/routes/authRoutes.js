import express from "express";
import {
    forgotPassword,
    login,
    register, updatePassword,
    user,
    verifyAccount, verifyUpdatePasswordReset,
} from "../controllers/authController.js";
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

//rutas de autenticación y registro
router.post('/register', register)
router.get('/verify/:token', verifyAccount)
router.post('/login', login)
router.post('/forgot-password', forgotPassword)
router.route('/forgot-password/:token')
    .get(verifyUpdatePasswordReset)
    .post(updatePassword)


// rutas privadas - requiere JWT
router.get('/user', authMiddleware, user)

export default router