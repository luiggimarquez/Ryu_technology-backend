const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080;
const productos = require('./routes/productos.js');

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/api/productos', productos)
app.use(express.static(__dirname+'/public'));

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))