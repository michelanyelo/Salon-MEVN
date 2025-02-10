import express from "express";
import {services} from "../data/beautyServices.js";

const router = express.Router()

// ruta controlador
router.get('/', (req, res) => {
    res.json(services)
})

export default router