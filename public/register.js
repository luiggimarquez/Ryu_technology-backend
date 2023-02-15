/* let submit = document.getElementById("submit")
let inputEmail = document.getElementById("email")
let inputPassword = document.getElementById("password")
let inputName = document.getElementById("name")
let dataBody = []
let va = []

submit.addEventListener("click", (e) => {

    e.preventDefault()
    dataBody = {

        name: inputName.value,
        email: inputEmail.value,
        password: inputPassword.value,
        isAdmin: false

    }

    dataBody = JSON.stringify(dataBody)
    console.log(dataBody)
    fetch("/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: dataBody
    }).then(response => {
        return response.text()
 
        location.href = '/products'

    }).catch(err => {
        console.log(err)
    });
})
 */