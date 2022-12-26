import ContenedorArchivo from "../../Contenedores/ContenedorArchivo.js";
import { promises as fs } from 'fs';

class CarritosDaoArchivo extends ContenedorArchivo{

    constructor(){
        super('db/files/carts.txt')
    }

    async createCart(cart){

        this.getAll().then(file => {
    
            let newCart = file
            cart.id = cart.id.toString()
            newCart.push(cart)
            let saveProductsToFile = JSON.stringify(newCart, null, 2)
            fs.writeFile('db/files/carts.txt', saveProductsToFile)
        }) 
    }

    async addItemCar(product,id){

        this.getAll().then(productsSaved => {
           
            productsSaved.forEach(cart => {
    
                if (cart.id === id) {
    
                    let index = cart.products.findIndex(itemProduct => itemProduct.id === product.id)
    
                    if(index < 0 ){
    
                        product = {...product, quantity:1}
                        cart.products.push(product)
    
                    }else{
    
                        cart.products.forEach(subCart =>{
    
                            if(subCart.id === product.id){
                             
                                subCart.quantity+=1
                            }
                        })
                    }  
                } 
            });
    
            let saveProductsToFile = JSON.stringify(productsSaved, null, 2)
            fs.writeFile('db/files/carts.txt', saveProductsToFile)
        })
    }

    async deleteItemCart(id,id_prod){
    
        this.getAll().then(productsSaved => {
    
            productsSaved.forEach( product =>{
    
                if(product.id === id){
    
                    product.products = product.products.filter(itemProduct => itemProduct.id !== parseInt(id_prod))
                }
            })
            let saveProductsToFile = JSON.stringify(productsSaved, null, 2)
            fs.writeFile('db/files/carts.txt', saveProductsToFile) 
        })
    }
}

export default CarritosDaoArchivo;