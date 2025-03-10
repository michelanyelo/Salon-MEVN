import User from "../models/User.js";
import {sendEmailPasswordReset, sendEmailVerification} from "../emails/authService.js";
import {generateJWT, randomId} from "../utils/index.js";

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

        res.json({
            msg: 'El usuario ha sido registrado exitosamente. Por favor, confirme su correo electrónico'
        })

        await sendEmailVerification({
            name, email, token
        })

    } catch (error) {
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

const login = async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})
    if (!user) {
        const error = new Error('El usuario no existe')
        return res.status(401).json({msg: error.message})
    }

    if (!user.verified) {
        const error = new Error('Tu cuenta aún no ha sido confirmada')
        return res.status(401).json({msg: error.message})
    }

    if (await user.checkPassword(password)) {
        const token = generateJWT(user._id)
        res.json({token})
    } else {
        const error = new Error('El password es incorrecto')
        return res.status(401).json({msg: error.message})
    }
}

const forgotPassword = async (req, res) => {
    const {email} = req.body

    const user = await User.findOne({email})
    if (!user) {
        const error = new Error('El usuario no existe')
        return res.status(401).json({msg: error.message})
    }

    try {
        user.token = randomId()
        user.verified = false
        const result = await user.save()

        res.json({msg: 'Se ha enviado un correo electrónico para restablecer la contraseña'})

        await sendEmailPasswordReset({
            name: result.name, email: result.email, token: result.token
        })

    } catch (error) {
        console.error(error)
    }
}

const verifyUpdatePasswordReset = async (req, res) => {
    const {token} = req.params
    const user = await User.findOne({token})
    if (!user) {
        const error = new Error('Hubo un error, token inválido')
        return res.status(401).json({msg: error.message})
    }

    try {
        user.verified = true
        await user.save()
        res.json({msg: 'Usuario verificado correctamente'})
    } catch (e) {
        console.error(e)
    }
}

const updatePassword = async (req, res) => {
    const {token} = req.params
    const user = await User.findOne({token})
    if (!user) {
        const error = new Error('Hubo un error, token inválido')
        return res.status(401).json({msg: error.message})
    }

    const {password} = req.body

    try {
        user.password = password
        user.token = ''
        await user.save()
        res.json({msg: 'Contraseña actualizada correctamente'})
    } catch (e) {
        console.error(e)
    }
}

const user = async (req, res) => {
    const {user} = req
    res.json(user)
}

const admin = async (req, res) => {
    const {user} = req

    if (!user.admin) {
        const error = new Error('No tienes permisos para acceder a esta sección')
        return res.status(401).json({msg: error.message})
    }

    res.json(user)
}

export {
    register, verifyAccount, login, forgotPassword, verifyUpdatePasswordReset, updatePassword, user, admin
}