import config from './config.js';
import { daoMethodMessage, daoMethodProducts } from './Persistencia/Daos/factory.js'
import productsRouter from './routes/routesProducts.js'
import './middleware/passport/localPassport.js'
import loginRouter from './routes/routesLogin.js'
import infoRouter from './routes/routesInfo.js'
import randomRouter from './routes/routerRandom.js'
import {Server as SocketServer} from 'socket.io'
import MongoStore from 'connect-mongo';
import session from 'express-session';
import { logger, loggerError, loggerWarn } from './utils/logger.js'
import {fileURLToPath} from 'url';
import * as dotenv from 'dotenv'
import passport from 'passport'
import  express from 'express';
import os from 'os'
import * as http from 'http';
import cluster from 'cluster'
import path from 'path';
dotenv.config()

switch(config.DAO){

    case "mongoDb":{

        await import ("./Persistencia/mongoDbConfig.js")
        break;
    }
    case "firebaseDb":{

        await import ("./Persistencia/firebaseDbConfig.js")
        break;
    }
}

const app = express()
const httpServer = http.createServer(app)
const socketServer = new SocketServer(httpServer)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(__dirname+ '/public'));
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.set('views', path.join(__dirname, '/public/partials'))
app.set('view engine','ejs')

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
app.use('/', productsRouter)
app.use(loginRouter)
app.use(infoRouter)
app.use('/api/randoms',randomRouter)

socketServer.on('connection',(client)=>{
    
    daoMethodProducts.getProducts().then((products) =>{
        
        if(products.length !== 0){
            socketServer.sockets.emit('products', products)
        }
    })

    client.on('update', () => {

        setTimeout(() => {

            daoMethodProducts.getProducts().then((products) =>{
               socketServer.sockets.emit('products', products)
            })

        }, 1000)
    })

    client.on('messageChat', (message) =>{

        let result = daoMethodMessage.saveItems(message)
        result.then((chats)=>{
            socketServer.sockets.emit('totalChat', chats)
        })
    })

    daoMethodMessage.getAll().then(msg =>{
        const messages = msg
        socketServer.sockets.emit('totalChat',messages)
      
    }) 
})

app.all('*', (req, res)=>{

    res.json({"error" : "Ruta no Exite"})
})

if(cluster.isPrimary && (config.MODE === 'CLUSTER')){

    logger.info("proceso maestro: ", process.pid)
    for(let i=0; i<(os.cpus().length); i++){

        cluster.fork()
    }

}else{

    const PORT = config.PORT
    httpServer.listen(PORT, () =>{
        logger.info(`Servidor escuchando al puerto ${PORT} - PID ${process.pid}`)
  
    })
    httpServer.on("error", error =>{
        logger.error(`Error en servidor ${error}`)
    
    })
}