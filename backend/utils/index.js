import mongoose from "mongoose";
import Service from "../models/Service.js";

function validateObjectId(id, res) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({msg: 'El id no es válido'}) && false;
    }
    return true;
}


async function hasExistences(id, res) {
    const service = await Service.findById(id);
    if (!service) {
        return res.status(404).json({msg: "El servicio no existe"}) && false;
    }
    return service;
}

const findServiceById = async (id, res) => {
    if (!validateObjectId(id, res)) return null;

    const service = await hasExistences(id, res);
    if (!service) return null;

    return service;
};


export {
    validateObjectId, hasExistences, findServiceById
}