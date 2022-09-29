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
let productReceived = []

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
								<img src="../img/plus.png" class="botonRedondo" id=id${id}>
						</div>

						<div class="dataBase">

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


			let modifyItem = document.getElementById(`myBtn${id}`)
			modifyItem.addEventListener(('click'), ()=>{

				modalContainer.innerHTML="";
				let divModal = document.createElement('div');
				divModal.classList.add('modal1');
				divModal.setAttribute("id","modal1");
				divModal.innerHTML=`
				
				<div class="alineadorContenido">
				
					<div class="dataBase">
					
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
				//let inputIdProduct = document.getElementById('idProduct')
				formUpdateProduct.addEventListener("click", () => {

					
					productReceived = {
						nameProduct: inputNewName.value,
						descriptionProduct: inputNewDescription.value,
						codeProduct: inputNewCode.value,
						photoProduct: inputNewUrl.value,
						priceProduct: inputNewPrice.value,
						stockProduct: inputNewStock.value
					};
		
					let dataBody = JSON.stringify(productReceived)
					fetch(`http://localhost:8080/api/productos/${id}`, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json"
						},
						body: dataBody
					})
					setTimeout(() => {
		
						location.reload()
					}, 1000)
				})


				
			}) 


			let deleteProduct= document.getElementById(`deleteItem${id}`)
			deleteProduct.addEventListener("click", () =>{

				let itemToDelete = JSON.stringify(product)
				fetch(`http://localhost:8080/api/productos/${id}`, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json"
					},
					body: itemToDelete
				})
				
				
				location. reload()

			})

			
			//modal
			let modal = document.getElementById("myModal");

			// Get the button that opens the modal
			let btn = document.getElementById(`myBtn${id}`);

			// Get the <span> element that closes the modal
			let span = document.getElementsByClassName("close")[0];

			// When the user clicks the button, open the modal 
			btn.onclick = function () {
				modal.style.display = "block";
			}

			// When the user clicks on <span> (x), close the modal
			span.onclick = function () {
				modal.style.display = "none";
			}

			// When the user clicks anywhere outside of the modal, close it
			window.onclick = function (event) {
				if (event.target == modal) {
					modal.style.display = "none";
				}
			}

		
		
		})//foreach
	}else
	containerProduct.innerHTML=`<div class="error">Producto no Existe<div>`

}

fetch('http://localhost:8080/api/productos').then(response => {return response.text()})
	.then(data => {
		
	console.log(data)
	const json = JSON.parse(data);
	console.log(json);
	loadProducts(json)

}).catch(err=>{
	console.log(err)
});

getProductbyId.addEventListener("keyup", ()=>{

	let inputItemId = getProductbyId.value;

	fetch(`http://localhost:8080/api/productos/${inputItemId}`).then(response => {return response.text()})
	.then(data => {
		
	console.log(data)
	const json = JSON.parse(data);
	console.log(json);
	loadProducts(json)

	}).catch(err=>{
		console.log(err)
	});




})

formAddProduct.onsubmit= (e) =>{

	e.preventDefault()
	productReceived = {
		nameProduct : inputNameProduct.value,
		descriptionProduct : inputDescriptionProduct.value,
		codeProduct : inputCodeProduct.value,
		photoProduct : inputPhotoProduct.value,
		priceProduct : inputPriceProduct.value,
		stockProduct : inputStockProduct.value};
   
	let dataBody = JSON.stringify(productReceived)
   	fetch("http://localhost:8080/api/productos", {
        method: "POST",
        headers: {
			"Content-Type": "application/json"
		},
        body: dataBody
    })
    
	location. reload()
}

fetch('*').then(response => {return response.text()})
	.then(data => {
		
	console.log(data)
	const json = JSON.parse(data);
	console.log(json);
	//loadProducts(json)

}).catch(err=>{
	console.log(err)
});
