import {services} from "../data/beautyServices.js";
import Service from "../models/Service.js";
import mongoose from "mongoose";

const getServices = (req, res) => {
    res.json(services)
}

const getService = async (req, res) => {
    const {id} = req.params
    // validar un object id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error('El id no es válido')

        return res.status(400).json({
            msg: error.message
        })
    }

    //  validar que exista
    const service = await Service.findById(id)
    if (!service) {
        const error = new Error('El servicio no existe')

        return res.status(404).json({
            msg: error.message
        })
    }


    //  mostrar el servicio
    res.json(service)
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

const updateService = async (req, res) => {
    const {id} = req.params
    // validar un object id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error('El id no es válido')

        return res.status(400).json({
            msg: error.message
        })
    }

    //  validar que exista
    const service = await Service.findById(id)
    if (!service) {
        const error = new Error('El servicio no existe')

        return res.status(404).json({
            msg: error.message
        })
    }

    // Reescribir objeto
    service.name = req.body.name || service.name
    service.price = req.body.price || service.price

    try{
        await  service.save()
        res.json({
            msg: 'El servicio se actualizó correctamente'
        })
    }catch (e) {
        console.error(e)
    }
}

export {
    getServices, getService, createService, updateService
}