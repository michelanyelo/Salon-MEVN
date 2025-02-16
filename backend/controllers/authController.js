import User from "../models/User.js";
import {sendEmailVerification} from "../emails/authService.js";

const register = async (req, res) => {
    // Validar todos los campos
    if (Object.values(req.body).includes('')) {
        const error = new Error('Todos los campos son obligatorios')

        return res.status(400).json({
            msg: error.message
        })
    }

    // Evitar registros duplicados
    const {email, password} = req.body
    const userExist = await User.findOne({email})

    if (userExist) {
        const error = new Error('Usuario duplicado')

        return res.status(400).json({
            msg: error.message
        })
    }

    // Validar la extensión del password
    const MIN_PASSWORD_LENGTH = 8
    if (password.trim().length < MIN_PASSWORD_LENGTH) {
        const error = new Error(`La contraseña debe contener al menos ${MIN_PASSWORD_LENGTH} caracteres`)

        return res.status(400).json({
            msg: error.message
        })
    }

    try {
        const user = new User(req.body)
        const result = await user.save()
        const {name, email, token} = result

        sendEmailVerification({
            name,
            email,
            token
        })

        res.json({
            msg: 'El usuario ha sido registrado exitosamente. Por favor, confirme su correo electrónico'
        })
    } catch (e) {
        console.error(error)
    }
}

const verifyAccount = async (req, res) => {
    const {token} = req.params
    const user = await User.findOne({token})
    if (!user) {
        const error = new Error('Hubo un error, token inválido')
        return res.status(401).json({msg: error.message})
    }

    try {
        user.verified = true
        user.token = ''
        await user.save()
        res.json({msg: 'Usuario verificado correctamente'})
    } catch (e) {
        console.error(e)
    }
}

export {
    register,
    verifyAccount
}