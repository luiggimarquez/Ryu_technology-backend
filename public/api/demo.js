let formUpdateProduct = document.getElementById("form")
let inputNameUpdate = document.getElementById("nameUpdate")


formUpdateProduct.onsubmit= (e) =>{

    e.preventDefault()
    console.log("--------------------------------------------------")
    const nameUpdate = inputNameUpdate.value;
    console.log(nameUpdate)
   /*  fetch("http://localhost:8080/api/productos/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(nameUpdate)
    }) */
    

}

