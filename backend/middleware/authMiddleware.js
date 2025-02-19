import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
    const header = req.headers.authorization
    if (header && header.startsWith('Bearer')) {
        try {
            const token = header.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select(
                "-password -verified -token -__v"
            )

            next()
        } catch {
            const error = new Error('Token no válido')
            res.status(403).json({msg: error.message})
        }

    } else {
        const error = new Error('Token no válido o inexistente')
        res.status(403).json({msg: error.message})
    }

}

export default authMiddleware