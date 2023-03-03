import express from "express";
import './src/middleware/passport.js'
import { loginValidator } from "./src/middleware/loginValidate.js";
import * as http from 'http';
import {Server as SocketServer} from 'socket.io'
import config from './config.js'
import { logger, loggerError } from "./utils/log.js";
import loginRouter from "./src/routes/loginRoutes.js";
import productsRouter from "./src/routes/productsRoute.js";
import cartRouter from "./src/routes/cartRoutes.js";
import ordersRouter from "./src/routes/ordersRoutes.js";
import infoRouter from "./src/routes/infoRoute.js"
import chatsRouter from "./src/routes/chatsRoutes.js";
import MongoStore from 'connect-mongo'
import session from 'express-session'
import path from 'path';
import passport from 'passport'
import './src/Persistence/mongoDbConfig.js'
import {fileURLToPath} from 'url';
import cookieParser from 'cookie-parser';
import { engine } from 'express-handlebars';
import socket from './utils/socket.js'


const app = express()
const httpServer = http.createServer(app)
const socketServer = new SocketServer(httpServer)
const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
app.use(express.static(__dirname+ '/public'));
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.set('views', path.join(__dirname, '/public/views/templates'))
app.set('view engine','ejs')
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.use(cookieParser());
app.use(session({
    secret:'RyuTechKey',
    resave: false,
    saveUninitialized:false,
    rolling:true,
    store: MongoStore.create({mongoUrl:config.MONGOSESSION}),
    cookie:{maxAge:config.SESSION_TIME}
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(loginRouter.init())
app.use(infoRouter.init())
app.use('/', loginValidator, passport.authenticate('jwt', {session: false}), productsRouter.init())
app.use('/carrito',loginValidator, passport.authenticate('jwt', {session: false}), cartRouter.init())
app.use('/orden', loginValidator,passport.authenticate('jwt', {session: false}), ordersRouter.init())
app.use('/chat', loginValidator, passport.authenticate('jwt', {session: false}), chatsRouter.init())

app.all('*', (req, res) =>{
    let response = {
		error : -2,
		description : `Ruta: ${req.path}   Metodo: ${req.method}  No implementada`
    };
    res.render('index.ejs', {response} )
})

function handleErrors(err, req, res, next) {

    let error=[err.view]
    console.log(err)
    res.status(500).render('errors.ejs',{err,error})
}

app.use(handleErrors);
socket(socketServer)

const PORT = config.PORT || 8080
    httpServer.listen(PORT, () =>{
        logger.info(`Servidor escuchando al puerto ${PORT} - PID ${process.pid}`)
  
    })
    httpServer.on("error", error =>{
        logger.error(`Error en servidor ${error}`)
        loggerError.error(`Error en servidor ${error}`)
    })