import ContenedorArchivo from "../../Contenedores/ContenedorArchivo.js";
import { promises as fs } from 'fs';

class ProductosDaoArchivo extends ContenedorArchivo{

    constructor(){
        super('db/files/products.txt')
    }

    async saveProducts(product){

        this.getAll().then(products => {

            let lastId = Math.max(...products.map(maxItem => maxItem.id)) 
            if (lastId === -Infinity) {lastId = 0}; 
            let FileToSave = {...product, id: (lastId + 1), timestamp: (new Date(Date.now()).toString())}
    
            products.push(FileToSave)
            let saveProductsToFile = JSON.stringify(products, null, 2)
            fs.writeFile('db/files/products.txt', saveProductsToFile)
        })
    }

    async updateProducts(product){ 
  
        this.getAll().then(products => {
    
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
            let saveProductsToFile = JSON.stringify(products, null, 2)
            fs.writeFile('db/files/products.txt', saveProductsToFile)
        })
    }

}

export default ProductosDaoArchivo