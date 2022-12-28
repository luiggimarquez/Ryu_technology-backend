import productsRoutes from './routes/routesProducts.js'
import { logger, loggerError } from './utils/logger.js'
import './middleware/localpassport.js'
import productsCart from './routes/routesCart.js'
import loginRouter from './routes/routesLogin.js'
import {fileURLToPath} from 'url';
import * as dotenv from 'dotenv'
import  express from 'express';
import path from 'path';
import  passport from 'passport';
import session  from 'express-session';
import MongoStore from 'connect-mongo';
import cluster from 'cluster';
import config from './config.js'
import os from 'os'
import userLogged from './utils/userLogged.js'

const app = express()
const PORT = 8081;
dotenv.config()

switch (process.env.db){

    case "mongoDb":{
        await import ('./Persistance/db/mongoConfig.js')
        break;
    }
    case "firebaseDb":{
        await import('./Persistance/db/firebaseConfig.js.js')
        break;
    }
}  

app.use(express.json())
app.use(express.urlencoded({extended: true}))
const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
app.use(express.static(__dirname+ '/public'));
app.set('views','./public/ejs/src/views/')
app.set('view engine','ejs')

app.use(session({
    secret: 'RyuTechTerceraEntrega',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    store: MongoStore.create({mongoUrl:'mongodb+srv://luiggimarquez:LuiggiMarquez@backendcordercourse.el27giy.mongodb.net/ecommerce?retryWrites=true&w=majority'}),
    cookie:{maxAge:600000}
}))

app.use(passport.initialize())
app.use(passport.session())
app.use('/api/productos', productsRoutes)
app.use('/api/carrito',productsCart)
app.use(loginRouter)

app.get("/", async (req,res) =>{

    let options = []
    if(req.isAuthenticated()){
        options = userLogged(req.user.userName, req.user.email, req.user.picture)
        res.sendFile('index.html', options)
    }else res.render('pages/login')  
}) 

app.all('*', (req, res) =>{
    let response = {
		error : -2,
		description : `Ruta: ${req.path}   Metodo: ${req.method}  No implementada`
    };
    res.render('pages/index', {response} )
})


if(cluster.isPrimary && (config.MODE === 'CLUSTER')){

    logger.info("proceso maestro: ", process.pid)
    for(let i=0; i<(os.cpus().length); i++){
        cluster.fork()
    }

}else{

    const server = app.listen(PORT, () => {
        logger.info(`Servidor http escuchando en el puerto ${server.address().port}`)
    })
    server.on("error", error => loggerError.error(`Error en servidor ${error}`))

}