/* 
let submit = document.getElementById("submit")
let inputEmail = document.getElementById("email")
let inputPassword = document.getElementById("password")
let dataBody = []
let va = []

submit.addEventListener("click", (e) => {

    e.preventDefault()
    dataBody = {

        email: inputEmail.value,
        password: inputPassword.value
    }

    dataBody = JSON.stringify(dataBody)
    console.log(dataBody)
    fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: dataBody
    }).then(response => {
        return response.text()
    }).then(data => {

        let json = JSON.parse(data)
        console.log(json)
        if(json){

        location.href = '/products'}

    }).catch(err => {
        console.log(err)
    });
}) */