class Products{

	constructor(name,description, price, stock, category){

		this.name = name;
		this.description = description
		this.price = price
		this.stock = stock
		this.category = category
	}
}

class Cart{

	constructor(timestampCart, products){

		this.timestampCart = timestampCart;
		this.products = products;
	}
}

let admin = []
let cart =[]
let idCartNow =[]
let productReceived = []
let formAddProduct = document.getElementById("form")
let inputNameProduct = document.getElementById("name")
let inputDescriptionProduct = document.getElementById("description")
let inputPriceProduct = document.getElementById("price")
//let inputPhotoProduct = document.getElementById("thumbnail")
let inputCategoryProduct= document.getElementById("category")
let inputStockProduct = document.getElementById("stock")
let containerProduct = document.getElementById('card')
let modalContainer = document.getElementById('itemModal')
let getProductbyId = document.getElementById("itemId")
let getCategory = document.getElementById("category")



function loadProducts(items) {

	containerProduct.innerHTML="";
	if(items.Error !== "Producto no encontrado"){

		items.forEach(product => {

			let { name,description,price,category,stock,thumbnail,_id } = product;

			let div = document.createElement('div');
			div.classList.add('item1');
			div.setAttribute("id","item1");
			if(!admin.isAdmin){
				div.innerHTML = `
					<div class="alineadorContenido">
				
						<img class="imgProduct" src="${thumbnail}" alt="">
						<div class="datosBoton">
								<span class=textCard>${name}</span>
								<button id="addCart${_id}" class="buttonProducts"> Add to Cart</button>
						</div>

						<div class="dataBase">

							<p>ID Producto: ${_id}</p>
							<p>Category: ${category}</p>
							<p>Precio: ${price}</p>
							<p>Disponibles: ${stock}</p>
							<p>Descripcion: ${description}</p></br>
							
						</div>
						
					</div>`;
					containerProduct.appendChild(div);
					
			}else{
				div.innerHTML = `
					<div class="alineadorContenido">
				
						<img class="imgProduct" src="${thumbnail}" alt="">
						<div class="datosBoton">
								<span class=textCard>${name}</span>
								<button class="buttonProducts" id="addCart${_id}"> Add to Cart</button>
						</div>

						<div class="dataBase">

							<p>ID Producto: ${_id}</p>
							<p>Category: ${category}</p>
							<p>Precio: ${price}</p>
							<p>Disponibles: ${stock}</p>
							<p>Descripcion: ${description}</p></br>
							
						</div>

						<div class="aliningButtons">
						<button class="buttonProducts" id="myBtn${_id}">Editar</button>
						<button class="buttonProducts" id="deleteItem${_id}">Borrar</button>
					</div>
						
					</div>`;
			
			containerProduct.appendChild(div);


			//Modal - Popup Window for show form to modify items

			let modifyItem = document.getElementById(`myBtn${_id}`)
			modifyItem.addEventListener(('click'), ()=>{

				modalContainer.innerHTML="";
				let divModal = document.createElement('div');
				divModal.classList.add('modal1');
				divModal.setAttribute("id","modal1");
				divModal.innerHTML=`
				
				<div class="alineadorContenido">
				
					<div class="dataBase">

						<div class="tittleFormEdit">Formulario para editar productos</div>
						<div class="dataModal"><p>ID: ${_id}</p><p><input type="text" class="input" value=${_id} name="idProduct" id="idProduct" readonly></p></div>
						<div class="dataModal"><p>Nombre: ${name}</p><p><input type="text" class="input" placeholder="Nuevo Nombre" name="newName" id="newName"></p></div>
						<div class="dataModal"><p>Category: ${category}</p><p><input type="text" class="input" placeholder="Nueva Categoria" name="newCategory" id="newCategory"></p></div>
						<div class="dataModal"><p>Precio: ${price}</p><p><input type="number" class="input" placeholder="Nuevo Precio" name="newPrice" id="newPrice"></p></div>
						<div class="dataModal"><p>Disponibles: ${stock}</p><p><input type="number" class="input" placeholder="Nuevo Valor" name="newStock" id="newStock"></p></div>
						<div class="dataModal"><p>Descripcion: ${description}</p><p><input type="text" class="input" placeholder="Nuevo Valor" name="newDescription" id="newDescription"></p></div>
						
					</div>
					<div class="aliningButtons">
						<button class="buttonProducts" id="submitPut">Guardar modificación</button>
					</div>

					<div class="dataBase">
						<form id="form" class="formCards" method="post" action="/products/imageUpdate" enctype="multipart/form-data" >
						<div class="dataModal"><p><input  type="hidden" class="input" value=${_id} name="idProduct" id="idProduct" readonly></p></div>	
						<div class="dataModal"><p>Foto: ${thumbnail}</p><p><input type="file" class="input" name="imgProductUpdate" required></p></div>
							
							<div class="aliningButtons">
								<button class="buttonProducts" id="submitPhoto">Guardar foto</button>
							</div>
						</form>
					</div>
					
					
				</div>`;

				modalContainer.appendChild(divModal);

				//let inputNewUrl = document.getElementById('newUrl')
				let inputNewName = document.getElementById('newName')
				let inputNewCategory = document.getElementById('newCategory')
				let inputNewPrice = document.getElementById('newPrice')
				let inputNewStock = document.getElementById('newStock')
				let inputNewDescription = document.getElementById('newDescription')
				let formUpdateProduct = document.getElementById('submitPut')
				
				formUpdateProduct.addEventListener("click", () => {

					productReceived = {
						name: inputNewName.value,
						description: inputNewDescription.value,
						category: inputNewCategory.value,
						price: inputNewPrice.value,
						stock: inputNewStock.value
					};
		
					// Fetch Method PUT modify any item

					let dataBody = JSON.stringify(productReceived)
					fetch(`/products/${_id}`, {
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

			let deleteProduct= document.getElementById(`deleteItem${_id}`)
			deleteProduct.addEventListener("click", () =>{

				let itemToDelete = JSON.stringify(product)
				fetch(`/products/${_id}`, {
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

			// Fetch Method POST to add  items to cart

			/* let addCart = document.getElementById(`addCart${_id}`)
			addCart.addEventListener("click", () =>{
				
				let dataBody = JSON.stringify(product)
				fetch(`/carrito/${idCartNow}/productos`,{
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: dataBody
				})

				//location.reload()
			}) */


			//modal
			let modal = document.getElementById("myModal");
			let btn = document.getElementById(`myBtn${_id}`);
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


		}//else

		// Fetch Method POST to add  items to cart

		let addCart = document.getElementById(`addCart${_id}`)
		addCart.addEventListener("click", () =>{
			
			let dataBody = JSON.stringify(product)
			fetch(`/carrito/${idCartNow}/productos`,{
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: dataBody
			})

			//location.reload()
		})
		
			
		})//foreach
	}else{
	containerProduct.innerHTML=`<div class="error">Producto no Existe<div>`}

}

// Fecth Get Method, for valide Admin user
fetch('/user').then(response => {
	
	return response.text()
}).then(data => {
	
	const json = JSON.parse(data);
	admin = json

}).catch(err => {
	console.log(err)
});

// Fetch Method GET, start with DOM for load products Card

fetch('/products').then(response => {
	
	return response.text()
}).then(data => {
	
	const json = JSON.parse(data);
	console.log(json)
	loadMenuCategory(json)
	loadProducts(json)

}).catch(err => {
	console.log(err)
});


//Fetch Method GET for search products by ID

getProductbyId.addEventListener("keyup", ()=>{

	let inputItemId = getProductbyId.value;
	fetch(`/products/${inputItemId}`).then(response => {
		return response.text()
	}).then(data => {

		
		const json = JSON.parse(data)
		loadProducts(json)

	}).catch(err=>{
		console.log(err)
	});

})
 
//Category Menu

let loadMenuCategory = (products) => {

	//divCateg.innerHTML = "";
	
	let hash = {};
	products = products.filter(product => hash[product.category] ? false : hash[product.category] = true);
	
	console.log(hash)
	console.log(products)
	
	let divCateg = document.getElementById("category")
	
	products.forEach( categoriesMenu => {
	divCateg.innerHTML += `
	
	<option value="${categoriesMenu.category}">${categoriesMenu.category}</option>			
	`
})
}

getCategory.addEventListener("change", ()=>{

	let getInputCategory = document.getElementById("category")
	console.log(getInputCategory.value)
	let inputItemCategory = getInputCategory.value;
	fetch(`/productos/category/${inputItemCategory}`).then(response => {
		return response.text()
	}).then(data => {
		
		const json = JSON.parse(data)
		loadProducts(json)
		
	}).catch(err=>{
		console.log(err)
	}); 

})


//Fetch Method GET for validate and create first cart

fetch('/carrito').then(response => {
	return response.text()
}).then(data =>{
	const json = JSON.parse(data);
	
	if(json.length == 0){

		cart = new Cart((new Date(Date.now()).toString()),[])
		let dataBody = JSON.stringify(cart)
		
		fetch("/carrito", {
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

		// if cart exist and it is still active, this idCartNow hold the actual Cart
		if(json[0]._id){
			idCartNow=json[0]._id
		}else{

			// This POST method create a new car when first car already exist and it is finished
			//idCartNow=JSON.parse(json)+1
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

}).catch(err=>{
	console.log(err)
});
