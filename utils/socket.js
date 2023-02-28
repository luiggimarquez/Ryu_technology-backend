let socket = (socketServer)=>{

    socketServer.on('connection',(client)=>{
    
   
        client.on('messageChat', (message) =>{
    
            console.log(message)
            socketServer.sockets.emit('totalChat', message)
        })
    
            
        client.on('update',(messages)=>{
            
        
            socketServer.sockets.emit('totalChat',messages)
          
        })
    })

}

export default socket