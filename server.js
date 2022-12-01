import productsRouter from './routes/routesProducts.js'
import './routes/middleware/passport/localPassport.js'
import loginRouter from './routes/routesLogin.js'
import infoRouter from './routes/routesInfo.js'
import randomRouter from './routes/routerRandom.js'
import {Server as SocketServer} from 'socket.io'
import MongoStore from 'connect-mongo';
import session from 'express-session';
import {fileURLToPath} from 'url';
import * as dotenv from 'dotenv'
import config from './config.js';
import passport from 'passport'
import  express from 'express';
import * as http from 'http';
import cluster from 'cluster'
import path from 'path';
dotenv.config()


import info from './utils/info.js';

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

let daoMethodProducts = []
let daoMethodMessage = []

switch(config.DB){

    case "archivoDb":{
        let { default : MessagesDaoFile } = await import('./Persistencia/Daos/messages/messagesDaoFile.js');
        let { default : ProductsDaoFile }= await import ('./Persistencia/DAOS/products/productsDaoFile.js')
        daoMethodMessage = new MessagesDaoFile
        daoMethodProducts =  new ProductsDaoFile
        break;
    }
    case "mongoDb":{
        let { default : ProductsDaoMongoDb } = await import ('./Persistencia/Daos/products/productsDaoMongoDb.js')
        let { default : MessagesDaoMongoDb } = await import ('./Persistencia/Daos/messages/messagesDaoMongoDb.js')
        daoMethodMessage = new MessagesDaoMongoDb
        daoMethodProducts =  new ProductsDaoMongoDb
        await import ("./Persistencia/mongoDbConfig.js")
        break;
    }
    case "firebaseDb":{

        let { default : MessagesDaoFirebaseDb } = await import ('./Persistencia/Daos/messages/messagesDaoFirebase.js')
        let { default : ProductsDaoFirebaseDb } = await import ('./Persistencia/Daos/products/productsDaoFirebase.js')
        daoMethodMessage = new MessagesDaoFirebaseDb
        daoMethodProducts =  new ProductsDaoFirebaseDb
        await import ("./Persistencia/firebaseDbConfig.js")
        break;
    }
}



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

if(cluster.isPrimary && (config.MODE === 'CLUSTER')){

    console.log("proceso maestro: ", process.pid)
    for(let i=0; i<4; i++){

        cluster.fork()
    }

}else{

    const PORT = config.PORT
    httpServer.listen(PORT, () =>{
        console.log(`Servidor escuchando al puerto ${PORT} - PID ${process.pid}`)
    })
    httpServer.on("error", error => console.log(`Error en servidor ${error}`))

}