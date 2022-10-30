let idCartNow = []
let containerProduct = document.getElementById('bodyCart')
let containerDeleteCart = document.getElementById('buttonEmpty')

loadProducts = (itemsCart) =>{
    
    containerProduct.innerHTML="";
	itemsCart.forEach(items => {

	    let { nameProduct,descriptionProduct,codeProduct,photoProduct,priceProduct,stockProduct,id, quantity } = items;
		let div = document.createElement('div');
		div.classList.add('item1');
		div.setAttribute("id","item1");
		div.innerHTML = `
			<div class="alineadorContenido">
				
				<img src="${photoProduct}" alt="">
				<div class="datosBoton">
					<span class=textCard>${nameProduct}</span>
				</div>

				<div class="dataBase">

					<p>Codigo: ${codeProduct}</p></br>
					<p>Precio: ${priceProduct}</p></br>
					<p>Disponibles: ${stockProduct}</p></br>
					<p>Descripcion: ${descriptionProduct}</p></br>
					<p>Cantidad agregada al carrito: ${quantity}</p></br>
							
				</div>
				<div class="aliningButtons">
					<button id="deleteItem${id}">Borrar</button>
				</div>
				
			</div>`;
		containerProduct.appendChild(div);

		// Fetch Method DELETE for delete items from Cart

		let deleteItem = document.getElementById(`deleteItem${id}`)
		deleteItem.addEventListener('click', () =>{

			let itemToDelete = JSON.stringify(itemsCart)
			
			fetch(`/api/carrito/${idCartNow}/productos/${id}`,{
			
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
		<button id="finishCart">Finalizar Compra </button>`
	containerDeleteCart.appendChild(div);

	let eventEmptyCart =  document.getElementById("emptyCart")
	eventEmptyCart.addEventListener("click", ()=>{

		fetch(`/api/carrito/${idCartNow}`,{
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			}
		})

		//After DELETE Method (empty and delete cart), this FETCH POST create a new cart

	setTimeout(()=>{
		fetch(`/api/carrito/`,{
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
			})

			location.reload();
		
		},1000)	
		
	})

	
	// After Finish Cart, this Fetch (POST) save the data from actual cart and make a new Cart

	filename = {
		id:(parseInt(idCartNow)+1).toString(),
		timestampCart:new Date(Date.now()).toString(),
		products:[]
	}

	let dataBody = JSON.stringify(filename)

	let eventFinishCart = document.getElementById("finishCart")
	eventFinishCart.addEventListener('click', () =>{

		fetch(`/api/carrito/`,{
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
		})

		
			
		location.reload();
        
	})	
}


loadCartEmpty= () => {

    containerProduct.innerHTML="";
	let div = document.createElement('div');
	div.innerHTML = `
			<div class="cartEmpty">
				
				<img src="./img/carritovacio.png" alt="imagen carrito de compras vacio">
                <h2> Carrito se encuentra vacío </h2>
                <a href="./products.html"><button>Ir a productos</button></a>
				
			</div>`;
	containerProduct.appendChild(div);
}

// Fetch Method Get to Validate if cart exist

fetch('/api/carrito/').then(response => {
		return response.text()
	}).then(data =>{
		const json = JSON.parse(data);
		if(json.length === 0){

			loadCartEmpty();

		}else{

			// ID from last cart
			idCartNow=json[(json.length - 1 )].id
			
    
			//Fetch Method Get for load items for the cart

            fetch(`/api/carrito/${idCartNow}/productos`).then(response => {
            	return response.text()
            }).then(data => {

				
            	const itemsCart = JSON.parse(data);
            	if (itemsCart[0].products.length === 0) {

            		loadCartEmpty();
            	} else {

            		loadProducts(itemsCart[0].products)
            	}
            })
		}

	}).catch(err=>{
	    console.log(err)
	});