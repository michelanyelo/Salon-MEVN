import express from "express";
import {getServices, createService} from "../controllers/serviceController.js";

const router = express.Router()

// ruta controlador
router.get('/', getServices)
router.post('/', createService)

export default router