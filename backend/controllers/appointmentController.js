import Appointment from "../models/Appointment.js";

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

export {
    createAppointment
}