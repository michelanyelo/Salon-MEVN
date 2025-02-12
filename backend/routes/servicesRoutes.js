import express from "express";
import {getServices, getService, createService, updateService} from "../controllers/serviceController.js";

const router = express.Router()

// ruta controlador
router.get('/', getServices)
router.post('/', createService)
router.get('/:id', getService)
router.put('/:id', updateService)

export default router