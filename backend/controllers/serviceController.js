import {services} from "../data/beautyServices.js";
import Service from "../models/Service.js";
import {findServiceById, hasExistences, validateObjectId} from "../utils/index.js";

const getServices = (req, res) => {
    res.json(services)
}

const getService = async (req, res) => {
    const {id} = req.params;

    const service = await findServiceById(id, res)
    if (!service) return;

    res.json(service);
};

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

const updateService = async (req, res) => {
    const {id} = req.params

    const service = await findServiceById(id, res)
    if (!service) return

    // Reescribir objeto
    service.name = req.body.name || service.name
    service.price = req.body.price || service.price

    try {
        await service.save()
        res.json({
            msg: 'El servicio se actualizó correctamente'
        })
    } catch (e) {
        console.error(e)
    }
}

export {
    getServices, getService, createService, updateService
}