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
    console.log('usuario conectado')
    
    productsList.products.then(data =>{
       client.emit('products', data)
    })

    client.on('update', () => {

        setTimeout(() => {

            productsList.products.then(data => {
                socketServer.sockets.emit('products', data)
            })
        }, 1000)
    })
})


const PORT = process.env.PORT || 3003;
httpServer.listen(PORT, () =>{
    console.log(`Servidor escuchando al puerto ${PORT}`)
})

httpServer.on("error", error => console.log(`Error en servidor ${error}`))