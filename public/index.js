const socketClient = io();
let form = document.getElementById('formulario')
let formChat = document.getElementById('formularioChat')
let inputName = document.getElementById("name")
let inputChat = document.getElementById("msg")
let inputTittle = document.getElementById('tittle')
let inputPrice = document.getElementById('price')
let inputThumbnail = document.getElementById('thumbnail')

socketClient.on('products', products => {

    loadTableProducts(products).then(productsToPrint => {

        document.getElementById('templateProducts').innerHTML = productsToPrint
    })
});

socketClient.on('totalChat', messages =>{

    printMessage(messages)
})

form.onsubmit = () =>{

    socketClient.emit('update')
}
 
formChat.onsubmit = (e) =>{

    e.preventDefault()
    const name = inputName.value;
    const message = inputChat.value;
    const date = new Date()
    const totalMesagge = `<p class="mailColor">${name}</p><p class="dateColor">[ ${date.toLocaleString()} ] </p> : <p class="colorMessage">${message}</p>`
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

printMessage = (messages) => {

    let main = document.getElementById('templateChat')
    main.innerHTML =[];
    messages.forEach(chatsToPrint =>{

        let messagePrinting = document.createElement("div");
        messagePrinting.className="formatPrinting";
        messagePrinting.innerHTML =`${chatsToPrint.chat}`
        main.insertAdjacentElement("beforeend", messagePrinting);
    })
}