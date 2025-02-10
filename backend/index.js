import express from 'express'
import servicesRoutes from "./routes/servicesRoutes.js";

// Configurar la app
const app = express()

// Definir una ruta
app.use('/api/services', servicesRoutes)

// Definir un puerto
const PORT = 5000 || process.env.PORT

// Arrancar la app
app.listen(PORT, () => {
    console.log('El servidor se está ejecutando en el puerto: ', PORT)
})
