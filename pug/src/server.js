const express = require('express')
const app = express()
const PORT = process.env.PORT || 8081;
const products = require('./routes/products.js');

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/productos', products)
app.use(express.static(__dirname+'../../../public'));

app.set('views','./pug/src/views' )
app.set('view engine', 'pug')

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))