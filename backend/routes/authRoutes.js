import express from "express";
import {register, verifyAccount} from "../controllers/authController.js";

const router = express.Router()

//rutas de autenticación y registro
router.post('/register', register)
router.get('/verify/:token', verifyAccount)

export default router