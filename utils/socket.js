let socket = (socketServer)=>{

    socketServer.on('connection',(client)=>{
    
        client.on('messageChat', (message) =>{
            socketServer.sockets.emit('totalChat', message)
        })
    
        client.on('update',(messages)=>{
            socketServer.sockets.emit('totalChat',messages)
        })
    })
}

export default socket