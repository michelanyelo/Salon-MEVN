import User from "../models/User.js";

const register = async (req, res) => {
    // Validar todos los campos
    if (Object.values(req.body).includes('')) {
        const error = new Error('Todos los campos son obligatorios')

        return res.status(400).json({
            msg: error.message
        })
    }

    // Evitar registros duplicados
    const {email} = req.body
    const userExist = await User.findOne({email})

    if (userExist){
        const error = new Error('Usuario duplicado')

        return res.status(400).json({
            msg: error.message
        })
    }

    // Validar la extensión del password

    try {
        const user = new User(req.body)
        await user.save()

        res.json({
            msg: 'El usuario ha sido registrado exitosamente. Por favor, confirme su correo electrónico'
        })
    } catch (e) {
        console.error(error)
    }
}

export {
    register
}