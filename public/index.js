const socketClient = io();
let form = document.getElementById('formulario')
let formChat = document.getElementById('formularioChat')
let inputName = document.getElementById("name")
let inputChat = document.getElementById("msg")

socketClient.on('products', prod => {

    loadTableProducts(prod).then(data => {

        document.getElementById('templateProducts').innerHTML = data
    })
});

socketClient.on('totalChat', msg =>{

    printMessage(msg)
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
        .then(data => {

            const template = Handlebars.compile(data);
            const tableProducts = template({products})
            return tableProducts
        })  
}

printMessage = (messages) => {

    let main = document.getElementById('templateChat')
    main.innerHTML =[];
    messages.forEach(x =>{

        let messagePrinting = document.createElement("div");
        messagePrinting.className="formatPrinting";
        messagePrinting.innerHTML =`${x}`
        main.insertAdjacentElement("beforeend", messagePrinting);
    })
}