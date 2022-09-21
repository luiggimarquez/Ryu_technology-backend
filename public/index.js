const socketClient = io();
let form = document.getElementById('formulario')

socketClient.on('products', prod => {

    loadTableProducts(prod).then(data => {

        document.getElementById('templateProducts').innerHTML = data
    })
});


form.onsubmit = (e) =>{
    //e.preventDefault();
  
    socketClient.emit('update')

}

function loadTableProducts(products) {
    
    return fetch('partials/partial.hbs')
        .then(response => response.text())
        .then(data => {

            const template = Handlebars.compile(data);
            const tableProducts = template({products})
            //console.log(tableProducts)
            return tableProducts
        })  
}





