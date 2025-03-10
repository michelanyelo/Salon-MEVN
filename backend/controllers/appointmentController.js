import Appointment from "../models/Appointment.js";
import {parse, formatISO, startOfDay, endOfDay, isValid} from "date-fns";
import {formatDate, handleNotFoundError, validateObjectId} from "../utils/index.js";
import {
    sendEmailCancelAppointment,
    sendEmailNewAppointment,
    sendEmailUpdateAppointment
} from "../emails/appointmentEmailService.js";

const createAppointment = async (req, res) => {

    const appointment = req.body
    appointment.user = req.user._id.toString()

    try {
        const newAppointment = new Appointment(appointment)
        const result = await newAppointment.save()
        res.json({
            msg: 'tu reserva fue procesada exitosamente'
        })

        await sendEmailNewAppointment({date: formatDate(result.date), time: result.time})
    } catch (error) {
        console.error(error)
    }
}

const getAppointmentsByDate = async (req, res) => {
    const {date} = req.query

    const newDate = parse(date, 'dd/MM/yyyy', new Date())

    if (!isValid(newDate)) {
        const error = new Error('Fecha no válida')

        return res.status(400).json({
            msg: error.message
        })
    }

    const isoDate = formatISO(newDate)
    const appointments = await Appointment.find({
        date: {
            $gte: startOfDay(new Date(isoDate)), $lte: endOfDay(new Date(isoDate))
        }
    }).select("time")

    res.json(appointments)

}

const getAppointmentById = async (req, res) => {
    const {id} = req.params

//     Validar por Object id
    if (validateObjectId(id, res)) return

//     Validar que exista
    const appointment = await Appointment.findById(id).populate('services')

    if (!appointment) {
        return handleNotFoundError('La cita no existe', res)
    }

    if (appointment.user.toString() !== req.user._id.toString()) {
        const error = new Error('No tienes los permisos suficientes')
        return res.status(403).json({msg: error.message})
    }

//     Retornar la cita
    res.json(appointment)
}

const updateAppointment = async (req, res) => {
    const {id} = req.params

//     Validar por Object id
    if (validateObjectId(id, res)) return

//     Validar que exista
    const appointment = await Appointment.findById(id).populate('services')

    if (!appointment) {
        return handleNotFoundError('La cita no existe', res)
    }

    if (appointment.user.toString() !== req.user._id.toString()) {
        const error = new Error('no tienes los permisos suficientes')
        return res.status(403).json({msg: error.message})
    }

    const {date, time, totalAmount, services} = req.body
    appointment.date = date
    appointment.time = time
    appointment.totalAmount = totalAmount
    appointment.services = services

    try {
        const result = await appointment.save()

        res.json({
            msg: 'tu cita se ha actualizado correctamente'
        })

        await sendEmailUpdateAppointment({date: formatDate(result.date), time: result.time})
    } catch (error) {
        console.error(error)
    }
}

const deleteAppointment = async (req, res) => {
    const {id} = req.params

    if (validateObjectId(id, res)) return

    const appointment = await Appointment.findById(id).populate('services')

    if (!appointment) {
        return handleNotFoundError('La cita no existe', res)
    }

    if (appointment.user.toString() !== req.user._id.toString()) {
        const error = new Error('no tienes los permisos suficientes')
        return res.status(403).json({msg: error.message})
    }

    try {
        const result = await appointment.deleteOne()
        res.json({msg: 'su cita ha sido removida'})

        // Enviar email
        await sendEmailCancelAppointment({
            date: formatDate(appointment.date),
            time: appointment.time,
            email: req.user.email,
            name: req.user.name,
            services: appointment.services
        })
    } catch (error) {
        console.error(error)
    }
}

export {
    createAppointment, getAppointmentsByDate, getAppointmentById, updateAppointment, deleteAppointment
}