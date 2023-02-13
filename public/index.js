console.log("hola")

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
        fetch("/login",  {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: dataBody
        }).then(response => {
                return response.text()
            }).then(data => {
    
                const json = JSON.parse(data);
                va = JSON.stringify(json.token)

               localStorage.setItem("token",va)
               location.href = '/products'
    
            }).catch(err=>{
                console.log(err)
            });
     })