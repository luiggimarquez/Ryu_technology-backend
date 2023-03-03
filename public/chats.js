const socketClient = io();
let formChat = document.getElementById('formularioChat')
let inputChat = document.getElementById("msg")
let inputSelect = []
let allMsg = []
let messagesFilter =[]

// Fetch GET method for Load initals Messages 
fetch('/chat',{
}).then(response => {return response.text()})
.then(data => {

    allMsg= JSON.parse(data);
    socketClient.emit('update',allMsg.result)
})

socketClient.on('totalChat', messages =>{
 
    if(allMsg.user.isAdmin){
        messagesFilter = messages
    }else{
        messagesFilter= messages.filter( item => item.email === allMsg.user.email)
    }
    printMessage(messagesFilter)
})

// Fetch POST Method for save a new message

formChat.onsubmit = (e) => {

    e.preventDefault();

    const message = inputChat.value;
    const date = new Date().toLocaleString();

    (allMsg.user.isAdmin) && (inputSelect = document.getElementById("mails"))
   
    const totalMesagge = {
        timestamp: date,
        email: (allMsg.user.isAdmin) ? inputSelect.value : allMsg.user.email,
        type: allMsg.user.isAdmin ? "sistema" : "usuario",
        message: message,
        img: allMsg.user.img
    };
    
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
        socketClient.emit("messageChat", allMsg);
        inputChat.value = "";      
    })
};

//Function for Print Messages in HTML

printMessage = (messages) => {
    
    let main = document.getElementById('templateChat')
    main.innerHTML =[];
    let nameShowed = []
    
    messages.forEach(items =>{
      
        (items.type === 'sistema') ? (nameShowed = ((allMsg.user.isAdmin) ? (`Admin, reply To:${items.email}`) : ("Admin") )) : (nameShowed=items.email)

        let messagePrinting = document.createElement("div");
        messagePrinting.className="formatPrinting";
        messagePrinting.innerHTML = `<p class="mailColor">${nameShowed}</p><p class="dateColor">[ ${items.timestamp} ]</p><img class="sizeAvatar" src=.${items.img}><p class="sizeAvatar"><p class="colorMessage"> ${items.message} </p>`
        main.insertAdjacentElement("beforeend", messagePrinting)
    }) 
    let spanPrint = document.createElement("span")
        spanPrint.setAttribute("id","span");
        main.insertAdjacentElement("beforeend", spanPrint)
        document.getElementById('span').scrollIntoView({ block: "end" })
       
    if(allMsg.user.isAdmin){

        let hash = {};
	    let reply = messages.filter(items => hash[items.email] ? false : hash[items.email] = true);
        let containerSelect = document.getElementById("mails")
        containerSelect.innerHTML=[];

        reply.forEach(emailsReply =>{
            containerSelect.innerHTML+= `<option value="${emailsReply.email}">${emailsReply.email}</option>`
        })
    }
}

