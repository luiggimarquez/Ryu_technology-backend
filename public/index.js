
function loadUserLogin(nameLogin, emailLogin, pictureLogin) {

    return fetch('ejs/src/views/pages/templateUserloged.ejs')
        .then(response => response.text())
        .then(templateUserLogin => {

            const template = ejs.compile(templateUserLogin);
            const tableUser = template({nameLogin, emailLogin, pictureLogin})
            return tableUser
        })  
}


fetch(`/`).then(response => {
    console.log(response.headers)
    return response.headers
    
}).then( data =>{

        console.log(data)
    loadUserLogin(data.get('name'), data.get('email'), data.get('picture')).then(template =>{
        document.getElementById('templateLogin').innerHTML = template
    })
})
