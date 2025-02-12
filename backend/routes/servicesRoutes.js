import express from "express";
import {
    getServices,
    getService,
    createService,
    updateService,
    deleteService
} from "../controllers/serviceController.js";

const router = express.Router()

// ruta controlador
router.route('/')
    .post(createService)
    .get(getServices)

router.route('/:id')
    .get(getService)
    .put(updateService)
    .delete(deleteService)

export default router