const express = require('express')
const http = require('http')
const {Server: SocketServer} = require('socket.io')
const productsList = require('./routes/products.js');

const app = express()
const httpServer = http.createServer(app)
const socketServer = new SocketServer(httpServer)

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/', productsList.router)
app.use(express.static(__dirname+ '/public'));

socketServer.on('connection',(client)=>{
    
    productsList.products.then(data =>{
        
        if(data.length !== 0){
            socketServer.sockets.emit('products', data)
        }
    })

    productsList.getChats().then(data =>{
        
        socketServer.sockets.emit('totalChat', data)
    })

    
    client.on('update', () => {

        setTimeout(() => {

            productsList.products.then(data => {
                socketServer.sockets.emit('products', data)
            })
        }, 1000)
    })

    client.on('messageChat', (msg) =>{

        let allMsg = productsList.saveChat(msg)
        allMsg.then( x =>{
            socketServer.sockets.emit('totalChat', x)
        })
    })
})

const PORT = process.env.PORT || 3003;
httpServer.listen(PORT, () =>{
    console.log(`Servidor escuchando al puerto ${PORT}`)
})
httpServer.on("error", error => console.log(`Error en servidor ${error}`))