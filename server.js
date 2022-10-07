import  express from 'express';
import * as http from 'http';
import {Server as SocketServer} from 'socket.io'
import { containerProducts, containerChats } from './db/db.js';
import productsRouter from './routes/routesProducts.js'
import path from 'path';
import {fileURLToPath} from 'url';

const app = express()
const httpServer = http.createServer(app)
const socketServer = new SocketServer(httpServer)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(__dirname+ '/public'));
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/', productsRouter)


socketServer.on('connection',(client)=>{
    
    containerProducts.getProducts().then((products) =>{
        
        if(products.length !== 0){
            socketServer.sockets.emit('products', products)
        }
    })

    client.on('update', () => {

        setTimeout(() => {

            containerProducts.getProducts().then((products) =>{
                socketServer.sockets.emit('products', products)
            })

        }, 1000)
    })

    client.on('messageChat', (message) =>{

        containerChats.saveChats(message)
        containerChats.getChats().then((chats)=>{

            socketServer.sockets.emit('totalChat', chats)
        })  
    })
    
    containerChats.getChats().then(chats =>{
        
        socketServer.sockets.emit('totalChat', chats)
    })
})

const PORT = process.env.PORT || 3003;
httpServer.listen(PORT, () =>{
    console.log(`Servidor escuchando al puerto ${PORT}`)
})
httpServer.on("error", error => console.log(`Error en servidor ${error}`))