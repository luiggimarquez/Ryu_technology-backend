const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080;
const products = require('./routes/products.js')
const cart = require('./routes/cart.js')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/api/productos',products)
app.use('/api/carrito',cart)
app.use(express.static(__dirname+'/public'));

app.get("/", (req,res) =>{

    res.sendFile('index.html')
})




const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))