const socketClient = io();
let formChat = document.getElementById('formularioChat')
let inputChat = document.getElementById("msg")
let inputSelect = []
let allMsg = []
let messagesFilter =[]

fetch('/chat',{
}).then(response => {return response.text()})
.then(data => {

    console.log(data)
     allMsg= JSON.parse(data);
    console.log(allMsg)
    socketClient.emit('update',allMsg.result)
})

socketClient.on('totalChat', messages =>{
 
    if(allMsg.user.isAdmin){
        messagesFilter = messages
    }else{
        messagesFilter= messages.filter( item => item.email === allMsg.user.email)
    }
    console.log(messagesFilter)
    printMessage(messagesFilter)
})

/* form.onsubmit = () =>{
    
    socketClient.emit('update')
} */

formChat.onsubmit = (e) => {

    e.preventDefault();

    const message = inputChat.value;
    const date = new Date().toLocaleString();

    (allMsg.user.isAdmin) && (inputSelect = document.getElementById("mails"))
   console.log(inputSelect.value)
   console.log(allMsg.user.isAdmin)

   console.log((allMsg.user.isAdmin) ? inputSelect.value : allMsg.user.email)

    const totalMesagge = {
      timestamp: date,
      email: (allMsg.user.isAdmin) ? inputSelect.value : allMsg.user.email,
      type: allMsg.user.isAdmin ? "sistema" : "usuario",
      message: message,
    };
    console.log("total", totalMesagge)
    let dataBody = JSON.stringify(totalMesagge);

    fetch("/chat/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: dataBody,
    }).then(response => {return response.text()})
    .then(data => {
        const allMsg = JSON.parse(data);
        console.log(allMsg)
        socketClient.emit("messageChat", allMsg);
        inputChat.value = "";
        let main = document.getElementById('templateChat')
      
    })
};

printMessage = (messages) => {
    
    let main = document.getElementById('templateChat')
    main.innerHTML =[];
    let nameShowed = []
    
    messages.forEach(items =>{
        
        (items.type === 'sistema') ? (nameShowed = ((allMsg.user.isAdmin) ? (`Admin, reply To:${items.email}`) : ("Admin") )) : (nameShowed=items.email)

        let messagePrinting = document.createElement("div");
        messagePrinting.className="formatPrinting";
        messagePrinting.innerHTML = `<p class="mailColor">${nameShowed}</p><p class="dateColor">[ ${items.timestamp} ]</p> <p class="sizeAvatar"><p class="colorMessage"> ${items.message} </p>`
        main.insertAdjacentElement("beforeend", messagePrinting)
    }) 
    let spanPrint = document.createElement("span")
        spanPrint.setAttribute("id","spann");
        main.insertAdjacentElement("beforeend", spanPrint)
        document.getElementById('spann').scrollIntoView(true)
    
        
    if(allMsg.user.isAdmin){

        let hash = {};
	    let reply = messages.filter(items => hash[items.email] ? false : hash[items.email] = true);
        //let mails = document.getElementById('mails')
        
        
        let containerSelect = document.getElementById("mails")
        containerSelect.innerHTML=[];

        reply.forEach(emailsReply =>{

            containerSelect.innerHTML+= `<option id="test" value="${emailsReply.email}">${emailsReply.email}</option>`
        })
    
        console.log("reply", reply)
    }

}

