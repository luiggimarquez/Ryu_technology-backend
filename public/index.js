const socketClient = io();
let form = document.getElementById('formulario')
let formChat = document.getElementById('formularioChat')
let inputName = document.getElementById("name")
let inputLastName = document.getElementById("lastName")
let inputAge = document.getElementById("age")
let inputMail = document.getElementById("mail")
let inputAlias = document.getElementById("alias")
let inputAvatar = document.getElementById("avatar")
let inputChat = document.getElementById("msg")
let inputTittle = document.getElementById('tittle')
let inputPrice = document.getElementById('price')
let inputThumbnail = document.getElementById('thumbnail')
let compression = document.getElementById('messageCompresion')
let messagePrintingCompresion = []
let compressionPercentage = []

function denormalization(items){

    let usersEntity = new normalizr.schema.Entity("author", {}, {
        idAttribute: "id"
    })
    let textEntity = new normalizr.schema.Entity("text", {}, {
        idAttribute: "message"
    })
    const messagesEntity = new normalizr.schema.Entity("messages", {
        author: usersEntity,
        text: textEntity
    }, {
        idAttribute: "idPost"
    })
       let messageMainEntity = new normalizr.schema.Entity("messagesMain", {
        messages: [messagesEntity]
    })
    
    let denormalization = normalizr.denormalize(items.result, messageMainEntity, items.entities)
        
    if(items.length !== 0 ){
        compressionPercentage = Math.round((((JSON.stringify(denormalization).length)/(JSON.stringify(items).length))*100))
    }else{compressionPercentage = 0}

    return (denormalization.messages)
}

socketClient.on('products', products => {

    loadTableProducts(products).then(productsToPrint => {
        document.getElementById('templateProducts').innerHTML = productsToPrint
    })
});

socketClient.on('totalChat', messages =>{
 
    let result = denormalization(messages)
    printMessage(result)
})

form.onsubmit = () =>{
    
    socketClient.emit('update')
}

formChat.onsubmit = (e) =>{

    e.preventDefault()

    const name = inputName.value;
    const lastName =  inputLastName.value;
    const age = inputAge.value;
    const mail = inputMail.value;
    const message = inputChat.value;
    const alias = inputAlias.value;
    const avatar = inputAvatar.value
    const date = new Date()
    
    const totalMesagge = {
        author: {
            id: mail,
            name: name,
            lastName: lastName,
            age: age,
            alias: alias,
            avatar: avatar,
            date: date.toLocaleString()
        },
        text: {
            message: message
        }
    }

    socketClient.emit("messageChat",totalMesagge)
    inputChat.value=''
}

function loadTableProducts(products) {
    
    return fetch('partials/partial.hbs')
        .then(response => response.text())
        .then(templateProducts => {
        const template = Handlebars.compile(templateProducts);
        const tableProducts = template({products})
        return tableProducts
    })  
}

function loadUserLogin(nameLogin) {

    return fetch('partials/templateUserloged.ejs')
        .then(response => response.text())
        .then(templateProducts => {

            const template = ejs.compile(templateProducts);
            const tableProducts = template({nameLogin})
            return tableProducts
        })  
}

printMessage = (messages) => {

    let main = document.getElementById('templateChat')
    main.innerHTML =[];
    
    messages.forEach(items =>{
        
        let messagePrinting = document.createElement("div");
        messagePrinting.className="formatPrinting";
        messagePrinting.innerHTML = `<p class="mailColor">${items.author.name}</p><p class="dateColor">[ ${items.author.date} ]</p> <p class="sizeAvatar"><img class="avatarMessage" src="${items.author.avatar}"></p>: <p class="colorMessage"> ${items.text.message} </p>`
        main.insertAdjacentElement("beforeend", messagePrinting)
    }) 

    compression.innerHTML =[]
    messagePrintingCompresion = document.createElement("div")
    messagePrintingCompresion.innerHTML = `Porcentaje de compresión: ${compressionPercentage} % `
    compression.insertAdjacentElement("beforeend", messagePrintingCompresion) 
}

// This fetch load the login name, due to this info is loaded as template compile inside index.HTML

fetch(`/`).then(response => {
    return response.headers.get('name')

}).then( data =>{

    loadUserLogin(data).then(template =>{
        document.getElementById('templateLogin').innerHTML = template
    })
})



