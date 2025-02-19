import express from "express";
import {login, register, user, verifyAccount} from "../controllers/authController.js";
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

//rutas de autenticación y registro
router.post('/register', register)
router.get('/verify/:token', verifyAccount)
router.post('/login', login)

// rutas privadas - requiere JWT
router.get('/user', authMiddleware, user)

export default router