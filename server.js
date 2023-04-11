const express = require('express')


const app = express()

app.get('/', (req,res) => {
    res.send('Hola mundo 1')
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`Servidor express escuchando en http://localhost:${PORT}`))
app.on('error', error => console.log(`Error en Servidor: ${error}`))

