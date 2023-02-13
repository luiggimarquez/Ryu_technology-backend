fetch('/products',{

    method: "POST",
    headers: {
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer "+${localStorage.token}`
        },

    }
}).then(response => {
    return response.text()
})