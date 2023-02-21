let idCartNow = []
let cart =[]
let containerProduct = document.getElementById('bodyCart')
let containerDeleteCart = document.getElementById('buttonEmpty')

class Cart{

	constructor(timestampCart, products){

		this.timestampCart = timestampCart;
		this.products = products;
	}
}

loadProducts = (itemsCart) =>{
    
    containerProduct.innerHTML="";
	itemsCart.forEach(items => {

	    let { name,description,category,thumbnail,price,stock,_id, quantity } = items;
		let div = document.createElement('div');
		div.classList.add('item1');
		div.setAttribute("id","item1");
		div.innerHTML = `
			<div class="alineadorContenido">
				
				<img src="${thumbnail}" alt="">
				<div class="datosBoton">
					<span class=textCard>${name}</span>
				</div>

				<div class="dataBase">

					<p>Codigo: ${category}</p></br>
					<p>Precio: ${price}</p></br>
					<p>Disponibles: ${stock}</p></br>
					<p>Descripcion: ${description}</p></br>
					<p>Cantidad agregada al carrito: ${quantity}</p></br>
							
				</div>
				<div class="aliningButtons">
					<button id="deleteItem${_id}">Borrar</button>
				</div>
				
			</div>`;
		containerProduct.appendChild(div);

		// Fetch Method DELETE for delete items from Cart

		let deleteItem = document.getElementById(`deleteItem${_id}`)
		deleteItem.addEventListener('click', () =>{

			let itemToDelete = JSON.stringify(itemsCart)
			
			fetch(`/carrito/${idCartNow}/productos/${_id}`,{
			
				method: "DELETE",
				headers: {
						"Content-Type": "application/json"
				},
				body: itemToDelete
			})

			location.reload();
		})

    })// end For Each

	// Fetch method DELETE for Empty Cart

	containerDeleteCart.innerHTML="";
	let div = document.createElement('div');
	div.classList.add('empty');
	div.setAttribute("id","empty");
	div.innerHTML = `
		<button id="emptyCart">Vaciar Carrito </button>
        <button type="submit" id="finishCart" >Finalizar Compra </button>
       
        `
	containerDeleteCart.appendChild(div);

	let eventEmptyCart =  document.getElementById("emptyCart")
	eventEmptyCart.addEventListener("click", ()=>{

		fetch(`/carrito/${idCartNow}`,{
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			}
		})

		location.href = '/'
	
	})

	
	// After Finish Cart, this Fetch (POST) save the data from actual cart and make a new Cart

/* 	filename = {
		id:(parseInt(idCartNow)+1).toString(),
		timestampCart:new Date(Date.now()).toString(),
		products:[]
	} */

	//let dataBody = JSON.stringify(filename)


	let eventFinishCart = document.getElementById("finishCart")
	eventFinishCart.addEventListener('click', () =>{ 

        console.log(idCartNow)

		fetch(`/carrito/${idCartNow}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(itemsCart)
		}).then(()=>{

			 /*fetch(`/carrito/`,{
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
				body: dataBody
			}).then(response => {
				return response.text()
			})
			.then(data => {
				const json = JSON.parse(data);
				console.log("Carrito creado, ID: ",json)
			})*/
            let order = JSON.stringify({ products: itemsCart, _id:idCartNow, timestamp: new Date(Date.now()).toString(), address:""})
            
            fetch('/orden/',{
                method: "POST",
                headers:{
                    "Content-Type" : "application/json"

                },
                body: order
            }).then(()=>{

				
            })

            localStorage.setItem("id_order", JSON.stringify(idCartNow))
			console.log(localStorage.getItem("id_order"))

            location.href = '/orden/preOrden'
		})
		  
	})	
}


loadCartEmpty= () => {

    containerProduct.innerHTML="";
	let div = document.createElement('div');
	div.innerHTML = `
			<div class="cartEmpty">
				
				<img src="../images/carritovacio.png" alt="imagen carrito de compras vacio">
                <h2> Carrito se encuentra vacío </h2>
                <a href="/productos"><button>Ir a productos</button></a>
				
			</div>`;
	containerProduct.appendChild(div);
}

// Fetch Method Get to Validate if cart exist

fetch('/carrito/').then(response => {
	return response.text()
	}).then(data =>{
		const json = JSON.parse(data);
		if(json.length == 0){

			loadCartEmpty();

		}else{

			// ID from actual user cart
			if(json[0]._id){
                idCartNow=json[0]._id
            }
			else{
                cart = new Cart((new Date(Date.now()).toString()),[])
			    let dataBody = JSON.stringify(cart)
                fetch("/carrito", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: dataBody}).then(response => {
                        return response.text()
                    })
                    .then(data => {
                        const json = JSON.parse(data);
                        idCartNow=json
            
                        console.log("Carrito creado, ID: ", idCartNow)
                    })
    
                    console.log(idCartNow)
                

            }
            
             
        }
		
			//Fetch Method Get for load items for the cart

        setTimeout(()=>{

            fetch(`/carrito/${idCartNow}/productos`).then(response => {
                return response.text()
            }).then(data => {
    
                const itemsCart = JSON.parse(data);
                if (itemsCart.error === 'producto no encontrado' || itemsCart[0].products.length === 0) {
                    loadCartEmpty();
                } else {
                    loadProducts(itemsCart[0].products)
                }
            }).catch(err=>{
                console.log(err)
            })
        },500)
		
	}).catch(err=>{
	    console.log(err)
	});