import ContenedorMemoria from "../../Contenedores/ContenedorMemoria.js"

class ProductosDaoMemoria extends ContenedorMemoria{

    constructor(items){

        super('productsMemory')
    }
    
    saveProducts(product){

        this.getAll().then((products) =>{

            let lastId = Math.max(...products.map(maxItem => maxItem.id)) 
            if (lastId === -Infinity) {lastId = 0}; 
            let FileToSave = {...product, id: (lastId + 1), timestamp: (new Date(Date.now()).toString())}
            products.push(FileToSave)
        })      
    }

    updateProducts(product){ 
  
        this.getAll().then((products) =>{
    
            products.forEach(productsSaved => {
                    
                if (productsSaved.id.toString() === product.id) {
        
                    if(product.nameProduct !== "")  (productsSaved.nameProduct = product.nameProduct)
                    if(product.descriptionProduct !== "") (productsSaved.descriptionProduct = product.descriptionProduct)
                    if(product.codeProduct !== "")  (productsSaved.codeProduct = product.codeProduct)
                    if(product.photoProduct !== "")  (productsSaved.photoProduct = product.photoProduct)
                    if(product.priceProduct !== "")  (productsSaved.priceProduct = product.priceProduct)
                    if(product.stockProduct !== "")  (productsSaved.stockProduct = product.stockProduct)
                }
            })
        }) 
    }
}

export default ProductosDaoMemoria;