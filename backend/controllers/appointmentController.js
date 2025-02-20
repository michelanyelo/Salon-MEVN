import Appointment from "../models/Appointment.js";
import {parse, formatISO, startOfDay, endOfDay, isValid} from "date-fns";

const createAppointment = async (req, res) => {

    const appointment = req.body
    appointment.user = req.user._id.toString()

    try {
        const newAppointment = new Appointment(appointment)
        await newAppointment.save()
        res.json({
            msg: 'tu reserva fue procesada exitosamente'
        })
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

export {
    createAppointment, getAppointmentsByDate
}