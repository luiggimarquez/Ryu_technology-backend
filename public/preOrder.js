let id = JSON.parse(localStorage.getItem("id_order"));


let submit =  document.getElementById("formAddress")

submit.addEventListener("submit", (e)=>{

    e.stopImmediatePropagation()
    e.preventDefault()

    
    let inputAddress =  document.getElementById("Address")
    let inputCity =  document.getElementById("City")
    let inputState =  document.getElementById("State")
    let inputReference = document.getElementById("Reference")
    let address = inputAddress.value
    let city = inputCity.value
    let state= inputState.value
    let reference = inputReference.value

    console.log(id)
    console.log(address)
    console.log(city)
    console.log(state)
    console.log(reference)

    let  infoAddressOrder = JSON.stringify({ address : `${address}, ${city}, ${state}. Referencia: ${reference}`, id:id })
    localStorage.clear();

    fetch("/orden/pre-orden",{

            method: "POST",
            headers:{
                    "Content-Type" : "application/json"

                },
                body: infoAddressOrder
    })/* .then(()=>{


        location.href = '/orden'
    }) */
        
    



})

