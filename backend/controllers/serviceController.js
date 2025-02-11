import {services} from "../data/beautyServices.js";
import Service from "../models/Service.js";

const getServices = (req, res) => {
    res.json(services)
}

const createService = async (req, res) => {
    const body = req.body
    if (Object.values(body).includes('')) {
        const error = new Error('Todos los campos son obligatorios')

        return res.status(400).json({
            msg: error.message
        })
    }

    try {
        const service = new Service(body)
        await service.save()
        res.json({
            msg: 'El servicio se creó correctamente'
        })
    } catch (e) {
        console.error(e)
    }
}

export {
    getServices, createService
}