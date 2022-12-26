export let productsMemory = []
let productsCartMemory = []

class ContenedorMemoria{
    
    constructor(items){
        this.items = items
    }

    getAll(){

        if(this.items == "productsMemory"){
            return new Promise ((resolve, reject) =>{
                return resolve(productsMemory)
            }) 
        }else if(this.items == "productsCartMemory"){
            return new Promise ((resolve, reject) =>{
                return resolve(productsCartMemory)
            }) 
        }     
    }

    getById(id){

        return new Promise ((resolve, reject) => {

            return resolve(

                this.getAll().then((productsSaved) =>{
                    let result = productsSaved.filter(itemProduct => itemProduct.id == id)
                    if(result.length === 0) (result = { error : 'producto no encontrado' })
                    return result  
                })
            )
        })
    }

    deleteItem(id){

        this.getAll().then((products) =>{

            products = products.filter(itemProduct => itemProduct.id != id)

            if(this.items == "productsMemory"){
                productsMemory = products
            }else if(this.items == "productsCartMemory"){
                productsCartMemory = products  
            }  
        })
    }
}

export default ContenedorMemoria;