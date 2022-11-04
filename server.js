import  express from 'express';
import * as http from 'http';
import {Server as SocketServer} from 'socket.io'
import productsRouter from './routes/routesProducts.js'
import path from 'path';
import {fileURLToPath} from 'url';
import * as dotenv from 'dotenv'
dotenv.config()

const app = express()
const httpServer = http.createServer(app)
const socketServer = new SocketServer(httpServer)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(__dirname+ '/public'));
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/', productsRouter)
app.set('views', path.join(__dirname, '/public/partials'))
app.set('view engine','ejs')

let daoMethodProducts = []
let daoMethodMessage = []

switch(process.env.db){

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

const PORT = process.env.PORT || 3003;
httpServer.listen(PORT, () =>{
    console.log(`Servidor escuchando al puerto ${PORT}`)
})
httpServer.on("error", error => console.log(`Error en servidor ${error}`))