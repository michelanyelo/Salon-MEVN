import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import cors from 'cors'
import servicesRoutes from "./routes/servicesRoutes.js";
import {db} from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import userRoutes from "./routes/userRoutes.js";

// Variables de entorno
dotenv.config()

// Configurar la app
const app = express()

// Leer datos via body
app.use(express.json())

// Conectar a bd
await db()

// Configurar CORS
const whiteList = [process.env.FRONTEND_URL]
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whiteList.includes(origin)) {
            // permitir conexión
            callback(null, true)
        } else {
            // rechazar conexión
            callback(new Error('Error de CORS'))
        }
    }
}
app.use(cors(corsOptions))

// Definir una ruta
app.use('/api/services', servicesRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/appointments', appointmentRoutes)
app.use('/api/users', userRoutes)

// Definir un puerto
const PORT = process.env.PORT || 3001

// Arrancar la app
app.listen(PORT, () => {
    console.log(colors.blue.bold('El servidor se está ejecutando en el puerto: ', PORT))
    console.log(colors.blue.bold('mongouri: ', process.env.MONGO_URI))
})
