import express from 'express'

// Configurar la app
const app = express()

// Definir una ruta
app.get('/', (req, res) => {
    const product = {
        id: 1, price: 30, name: 'Laptop'
    }
    res.send(product)
})

// Definir un puerto
const PORT = 4000 || process.env.PORT

// Arrancar la app
app.listen(PORT, () => {
    console.log('El servidor se está ejecutando en el puerto: ', PORT)
})
