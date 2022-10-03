const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080;
const products = require('./routes/routesProducts.js')
const cart = require('./routes/routesCart.js')
let isAdmin = false // boolean variable to determine if the user is an administrator or not

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/api/productos',products)
app.use('/api/carrito',cart)
app.use(express.static(__dirname+'/public'));
app.set('views','./public/ejs/src/views/')
app.set('view engine','ejs')

app.get("/", (req,res) =>{

    res.sendFile('index.html')
})

app.all('*', (req, res) =>{
    let response = {
		error : -2,
		description : `Ruta: ${req.path}   Metodo: ${req.method}  No implementada`
    };
    res.render('pages/index', {response} )
})

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))