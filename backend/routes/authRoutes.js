import express from "express";
import {register} from "../controllers/authController.js";

const router = express.Router()

//rutas de autenticación y registro
router.post('/register', register)

export default router