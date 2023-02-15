import express from "express";
import './src/middleware/passport.js'
import { loginValidator } from "./src/middleware/loginValidate.js";
import * as http from 'http';
import {Server as SocketServer} from 'socket.io'
import config from './config.js'
import { logger, loggerError } from "./utils/log.js";
import loginRouter from "./src/routes/loginRoutes.js";
import routerProducts from "./src/routes/productsRoute.js";
import infoRouter from "./src/routes/infoRoute.js"
import MongoStore from 'connect-mongo'
import session from 'express-session'
import path from 'path';
import passport from 'passport'
import './src/Persistence/mongoDbConfig.js'
import {fileURLToPath} from 'url';
import cookieParser from 'cookie-parser';


const app = express()
const httpServer = http.createServer(app)
const socketServer = new SocketServer(httpServer)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(__dirname+ '/public'));
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.set('views', path.join(__dirname, '/public/views/ejs'))
app.set('view engine','ejs')

app.use(cookieParser());

app.use(session({
    secret:'RyuTechKey',
    resave: false,
    saveUninitialized:false,
    rolling:true,
    store: MongoStore.create({mongoUrl:config.MONGOSESSION}),
    cookie:{maxAge:600000}
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(loginRouter.init())
app.use(infoRouter.init())
app.use('/', loginValidator, passport.authenticate('jwt', {session: false}), routerProducts.init())

const PORT = config.PORT || 8080
    httpServer.listen(PORT, () =>{
        logger.info(`Servidor escuchando al puerto ${PORT} - PID ${process.pid}`)
  
    })
    httpServer.on("error", error =>{
        logger.error(`Error en servidor ${error}`)
        loggerError.error(`Error en servidor ${error}`)
    
    })