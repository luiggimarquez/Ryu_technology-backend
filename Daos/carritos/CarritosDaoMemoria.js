import ContenedorMemoria from "../../Contenedores/ContenedorMemoria.js"
let productsCartMemory = []

class CarritosDaoMemoria extends ContenedorMemoria{

    constructor(){

        super('productsCartMemory')
    } 

    createCart(cart){

        this.getAll().then((file)=>{

            let newCart = file
            cart.id = cart.id.toString()
            newCart.push(cart)
            productsCartMemory = newCart
        }) 
    }

    addItemCar(product,id){

        this.getAll().then((productsSaved) =>{

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
            productsCartMemory = productsSaved;
        })
    }

    deleteItemCart(id,id_prod){
    
        this.getAll().then((productsSaved)=>{

            productsSaved.forEach( product =>{
        
                if(product.id === id){
                    product.products = product.products.filter(itemProduct => itemProduct.id !== parseInt(id_prod))
                }
            })
            productsCartMemory = productsSaved
        }) 
    }

}

export default CarritosDaoMemoria;