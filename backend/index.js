import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import servicesRoutes from "./routes/servicesRoutes.js";
import {db} from "./config/db.js";

// Variables de entorno
dotenv.config()

// Configurar la app
const app = express()

// Conectar a bd
await db()

// Definir una ruta
app.use('/api/services', servicesRoutes)

// Definir un puerto
const PORT = process.env.PORT || 3001

// Arrancar la app
app.listen(PORT, () => {
    console.log(colors.blue.bold('El servidor se está ejecutando en el puerto: ', PORT))
    console.log(colors.blue.bold('mongouri: ', process.env.MONGO_URI))
})
