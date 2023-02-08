class Products{

	constructor(name,description, price, imageURL){

		this.name = name;
		this.description = description;
		this.price = price;
		this.imageURL = imageURL
	}
}

let formAddProduct = document.getElementById("form")
let containerProduct = document.getElementById('card')
let inputName = document.getElementById("name")
let inputDescription= document.getElementById("description")
let inputPrice = document.getElementById("price")
let inputImageURL = document.getElementById("imageURL")
let getProductbyId = document.getElementById("itemId")
let modalContainer = document.getElementById('itemModal')





function loadProducts(items) {

	containerProduct.innerHTML="";
	console.log(items)
	if(items.error !== ("Not Found")){

		items.products.forEach(product => {

			let { name,description,price,imageURL, id } = product;

			let div = document.createElement('div');
			div.classList.add('item1');
			div.setAttribute("id","item1");
			div.innerHTML = `
					<div class="alineadorContenido">
				
						<img src="${imageURL}" alt="">
						<div class="datosBoton">
								<span class=textCard>${name}</span>
								<button id="addCart${id}"> Add to Cart</button>
						</div>

						<div class="dataBase">

							<p>ID Producto: ${id}</p></br>
							<p>Precio: ${price}</p></br>
							<p>Descripcion: ${description}</p></br>
							
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
			
									<div class="tittleFormEdit">Formulario para editar productos</div>
									<div class="dataModal"><p>ID: ${id}</p><p><input type="number" class="input" value=${id} name="idProduct" id="idProduct" readonly></p></div>
									<div class="dataModal"><p>Foto: ${imageURL}</p><p><input type="text" class="input" placeholder="Nuevo URL" name="newUrl" id="newUrl" required></p></div>
									<div class="dataModal"><p>Nombre: ${name}</p><p><input type="text" class="input" placeholder="Nuevo Nombre" name="newName" id="newName" required></p></div>
									<div class="dataModal"><p>Precio: ${price}</p><p><input type="number" class="input" placeholder="Nuevo Precio" name="newPrice" id="newPrice" required></p></div>
									<div class="dataModal"><p>Descripcion: ${description}</p><p><input type="text" class="input" placeholder="Nuevo Valor" name="newDescription" id="newDescription" required></p></div>
									
								</div>
								<div class="aliningButtons">
									<button id="submitPut">Guardar modificación</button>
								</div>
								
							</div>`;
						modalContainer.appendChild(divModal);

				let inputNewUrl = document.getElementById('newUrl')
				let inputNewName = document.getElementById('newName')
				let inputNewPrice = document.getElementById('newPrice')
				let inputNewDescription = document.getElementById('newDescription')
				let formUpdateProduct = document.getElementById('submitPut')
				
				formUpdateProduct.addEventListener("click", () => {

					productReceived = {
						name: inputNewName.value,
						description: inputNewDescription.value,
						price: inputNewPrice.value,
						imageURL: inputNewUrl.value,
					};
		
					// Fetch Method PUT modify any item

					let dataBody = JSON.stringify(productReceived)
					fetch(`/product/${id}`, {
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





						let deleteProduct= document.getElementById(`deleteItem${id}`)
						deleteProduct.addEventListener("click", () =>{

						let itemToDelete = JSON.stringify(product)
						fetch(`/product/${id}`, {
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
                }else{
                    containerProduct.innerHTML=`<div class="error">Producto no Existe<div>`}
                    
                }
                
                
                fetch('/product').then(response => {
                    return response.text()
                }).then(data => {
                    const json = JSON.parse(data);
                    console.log(json)
                    loadProducts(json)
                    
                }).catch(err => {
                    console.log(err)
                });
                
                getProductbyId.addEventListener("keyup", ()=>{
                
                    let inputItemId = getProductbyId.value;
                
                    fetch(`/product/${inputItemId}`).then(response => {
                        return response.text()
                    }).then(data => {
                
                        const json = JSON.parse(data);
						console.log(json)
                        loadProducts(json)
                
                    }).catch(err=>{
                        console.log(err)
                    });
                
                })

                formAddProduct.onsubmit= (e) =>{

	e.preventDefault()
	productReceived = new Products(inputName.value,inputDescription.value, inputPrice.value, inputImageURL.value)

	let dataBody = JSON.stringify(productReceived)
   	fetch("/product/create", {
        method: "POST",
        headers: {
			"Content-Type": "application/json"
		},
        body: dataBody
    })

	setTimeout(()=>{
		location.reload()}, 1000)
}
