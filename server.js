import productsRoutes from './routes/routesProducts.js'
import productsCart from './routes/routesCart.js'
import {fileURLToPath} from 'url';
import * as dotenv from 'dotenv'
import  express from 'express';
import path from 'path';
const app = express()
const PORT = process.env.PORT || 8080;
dotenv.config()

switch (process.env.db){

    case "mongoDb":{
        await import ('./db/mongoConfig.js')
        break;
    }
    case "firebaseDb":{
        await import('./db/firebaseConfig.js')
        break;
    }
}  

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/api/productos', productsRoutes)
app.use('/api/carrito',productsCart)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(__dirname+ '/public'));
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