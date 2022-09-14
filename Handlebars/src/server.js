const express = require('express')
const app = express()
const PORT = process.env.PORT || 8081;
const products = require('./routes/products.js');
const hbs = require('express-handlebars')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/productos', products)
app.use(express.static(__dirname+'../../../public'));

app.engine('hbs', hbs.engine({

	partialDir: __dirname+'/views/partials',
	layoutsDir: __dirname+'/views/layouts',
	extname: '.hbs',
	defaultLayout: 'layout1.hbs'

}))

app.set ('views','./Handlebars/src/views/partials')
app.set ('view engine', 'hbs')

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))