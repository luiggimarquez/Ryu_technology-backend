class Products{

	constructor(nameProduct,descriptionProduct, codeProduct, photoProduct, priceProduct, stockProduct){

		this.nameProduct = nameProduct;
		this.descriptionProduct = descriptionProduct;
		this.codeProduct = codeProduct;
		this.photoProduct = photoProduct
		this.priceProduct = priceProduct
		this.stockProduct = stockProduct
	}
}

class Cart{

	constructor(idCart, timestampCart, products){

		this.idCart = idCart;
		this.timestampCart = timestampCart;
		this.products = products;

	}
}

let cart =[]
let idCartNow =[]
let productReceived = []
let formAddProduct = document.getElementById("form")
let inputNameProduct = document.getElementById("nameProduct")
let inputDescriptionProduct = document.getElementById("descriptionProduct")
let inputCodeProduct = document.getElementById("codeProduct")
let inputPhotoProduct = document.getElementById("photoProduct")
let inputPriceProduct = document.getElementById("priceProduct")
let inputStockProduct = document.getElementById("stockProduct")
let containerProduct = document.getElementById('card')
let modalContainer = document.getElementById('itemModal')
let getProductbyId = document.getElementById("itemId")

// function for write HTML code

function loadProducts(items) {

	containerProduct.innerHTML="";
	if(items.error !== "producto no encontrado"){

		items.forEach(product => {

			let { nameProduct,descriptionProduct,codeProduct,photoProduct,priceProduct,stockProduct,id } = product;

			let div = document.createElement('div');
			div.classList.add('item1');
			div.setAttribute("id","item1");
			div.innerHTML = `
					<div class="alineadorContenido">
				
						<img src="${photoProduct}" alt="">
						<div class="datosBoton">
								<span class=textCard>${nameProduct}</span>
								<button id="addCart${id}"> Add to Cart</button>
						</div>

						<div class="dataBase">

							<p>ID Producto: ${id}</p></br>
							<p>Codigo: ${codeProduct}</p></br>
							<p>Precio: ${priceProduct}</p></br>
							<p>Disponibles: ${stockProduct}</p></br>
							<p>Descripcion: ${descriptionProduct}</p></br>
							
						</div>
						<div class="aliningButtons">
							<button  id="myBtn${id}">Editar</button>
							<button id="deleteItem${id}">Borrar</button>
						</div>

					</div>`;
			containerProduct.appendChild(div);


			//Modal - Popup Window for show form to modify items

			let modifyItem = document.getElementById(`myBtn${id}`)
			modifyItem.addEventListener(('click'), ()=>{

				modalContainer.innerHTML="";
				let divModal = document.createElement('div');
				divModal.classList.add('modal1');
				divModal.setAttribute("id","modal1");
				divModal.innerHTML=`
				
				<div class="alineadorContenido">
				
					<div class="dataBase">

						<div class="tittleFormEdit">Formulario para editar productos</div>
						<div class="dataModal"><p>ID: ${id}</p><p><input type="number" class="input" value=${id} name="idProduct" id="idProduct" readonly></p></div>
						<div class="dataModal"><p>Foto: ${photoProduct}</p><p><input type="text" class="input" placeholder="Nuevo URL" name="newUrl" id="newUrl"></p></div>
						<div class="dataModal"><p>Nombre: ${nameProduct}</p><p><input type="text" class="input" placeholder="Nuevo Nombre" name="newName" id="newName"></p></div>
						<div class="dataModal"><p>Codigo: ${codeProduct}</p><p><input type="text" class="input" placeholder="Nuevo Codigo" name="newCode" id="newCode"></p></div>
						<div class="dataModal"><p>Precio: ${priceProduct}</p><p><input type="number" class="input" placeholder="Nuevo Precio" name="newPrice" id="newPrice"></p></div>
						<div class="dataModal"><p>Disponibles: ${stockProduct}</p><p><input type="number" class="input" placeholder="Nuevo Valor" name="newStock" id="newStock"></p></div>
						<div class="dataModal"><p>Descripcion: ${descriptionProduct}</p><p><input type="text" class="input" placeholder="Nuevo Valor" name="newDescription" id="newDescription"></p></div>
						
					</div>
					<div class="aliningButtons">
						<button id="submitPut">Guardar modificación</button>
					</div>
					
				</div>`;

				modalContainer.appendChild(divModal);

				let inputNewUrl = document.getElementById('newUrl')
				let inputNewName = document.getElementById('newName')
				let inputNewCode = document.getElementById('newCode')
				let inputNewPrice = document.getElementById('newPrice')
				let inputNewStock = document.getElementById('newStock')
				let inputNewDescription = document.getElementById('newDescription')
				let formUpdateProduct = document.getElementById('submitPut')
				
				formUpdateProduct.addEventListener("click", () => {

					productReceived = {
						nameProduct: inputNewName.value,
						descriptionProduct: inputNewDescription.value,
						codeProduct: inputNewCode.value,
						photoProduct: inputNewUrl.value,
						priceProduct: inputNewPrice.value,
						stockProduct: inputNewStock.value
					};
		
					// Fetch Method PUT modify any item

					let dataBody = JSON.stringify(productReceived)
					fetch(`http://localhost:8080/api/productos/${id}`, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json"
						},
						body: dataBody
					}).then(response => {return response.text()})
					  .then(data => {
						const json = JSON.parse(data);
						alert(`Error: ${json.error}, Descripcion: ${json.description} `);
					})
					setTimeout(() => {
		
						location.reload()
					}, 1000)
				})


				
			}) 

			// Fetch Method Delete to delete any item

			let deleteProduct= document.getElementById(`deleteItem${id}`)
			deleteProduct.addEventListener("click", () =>{

				let itemToDelete = JSON.stringify(product)
				fetch(`http://localhost:8080/api/productos/${id}`, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json"
					},
					body: itemToDelete

				}).then(response => {return response.text()})
				.then(data => {
				const json = JSON.parse(data);
				alert(`Error: ${json.error}, Descripcion: ${json.description} `);
				})
				
				location.reload()
			})

			let addCart = document.getElementById(`addCart${id}`)
			addCart.addEventListener("click", () =>{
				
				let dataBody = JSON.stringify(product)
				fetch(`http://localhost:8080/api/carrito/${idCartNow}/productos`,{
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: dataBody
				})

				location.reload()
			})


			//modal
			let modal = document.getElementById("myModal");
			let btn = document.getElementById(`myBtn${id}`);
			let span = document.getElementsByClassName("close")[0]; 
			btn.onclick = function () {
				modal.style.display = "block";
			}
			span.onclick = function () {
				modal.style.display = "none";
			}
			window.onclick = function (event) {
				if (event.target == modal) {
					modal.style.display = "none";
				}
			}

		})//foreach
	}else
	containerProduct.innerHTML=`<div class="error">Producto no Existe<div>`
}


// Fetch Method GET, start with DOM for load products Card

fetch('http://localhost:8080/api/productos').then(response => {
	return response.text()
}).then(data => {
	const json = JSON.parse(data);

	loadProducts(json)

}).catch(err => {
	console.log(err)
});


// Fetch Method GET for search products by ID

getProductbyId.addEventListener("keyup", ()=>{

	let inputItemId = getProductbyId.value;

	fetch(`http://localhost:8080/api/productos/${inputItemId}`).then(response => {
		return response.text()
	}).then(data => {

		const json = JSON.parse(data);
		loadProducts(json)

	}).catch(err=>{
		console.log(err)
	});

})


//Fetch Method POST for save Products

formAddProduct.onsubmit= (e) =>{

	e.preventDefault()
	productReceived = new Products(inputNameProduct.value,inputDescriptionProduct.value, inputCodeProduct.value, inputPhotoProduct.value, inputPriceProduct.value, inputStockProduct.value)

	let dataBody = JSON.stringify(productReceived)
   	fetch("http://localhost:8080/api/productos", {
        method: "POST",
        headers: {
			"Content-Type": "application/json"
		},
        body: dataBody
    }).then(response => {return response.text()})
		.then(data => {
		const json = JSON.parse(data);
		alert(`Error: ${json.error}, Descripcion: ${json.description} `);
	})

	location.reload()
}

//Fetch Method GET for validate and create first cart

fetch('http://localhost:8080/api/carrito/').then(response => {
	return response.text()
}).then(data =>{
	const json = JSON.parse(data);
	
	if(json.length === 0){

		cart = new Cart("1",(new Date(Date.now()).toString()),[])
		let dataBody = JSON.stringify(cart)
		
		fetch("http://localhost:8080/api/carrito", {
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
			idCartNow=json

			console.log("Carrito creado, ID: ", idCartNow)
		})

	}else{

		idCartNow=json[(json.length - 1)].idCart
			
	}

}).catch(err=>{
	console.log(err)
});
