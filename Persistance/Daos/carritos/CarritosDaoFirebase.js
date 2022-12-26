import ContenedorFirebase from '../../Contenedores/ContenedorFirebase.js'
import { firestoreDb } from '../../Persistance/db/firebaseConfig.js.js';
import {loggerError} from '../../../utils/logger.js'

class CarritosDaoFirebase extends ContenedorFirebase{

    constructor(){

        super("carts")
    }

    async createCart(cart){

        try {
                
            await firestoreDb.collection('carts').doc(`${cart.id}`).create({
                id:cart.id,
                timestampCart:cart.timestampCart,
                products:cart.products

            })

        } catch (error) {

            loggerError.error(error) 
        }
    }

    async addItemCar(product,id){

        this.getAll().then(productsSaved => {

            productsSaved.forEach(cart => {

                if (cart.id === id) {

                    let index = cart.products.findIndex(itemProduct => itemProduct.id === product.id)
                    if(index < 0 ){
    
                        product = {...product,quantity: 1}
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

            let productsArray = []

            productsSaved.forEach(array => {

                if(array.id == id){

                    array.products.forEach(nestedArray => {

                        productsArray.push(nestedArray)
                    })
                }
            })

            let db = firestoreDb.collection('carts')
            db.doc(id).set({products: productsArray}, { merge: true}) 
        }) 
    } 

    async deleteItemCart(id,id_prod){

        this.getAll().then(productsSaved => {
    
            productsSaved.forEach( product =>{
    
                if(product.id === id){
    
                    product.products = product.products.filter(itemProduct => itemProduct.id !== id_prod)
                } 
            })
            
            let productsArray = []
            productsSaved.forEach(array => {

                if(array.id == id){

                    array.products.forEach(nestedArray => {

                        productsArray.push(nestedArray)
                    })
                }
            })
            let db = firestoreDb.collection('carts')
            db.doc(id).set({products: productsArray}, { merge: true})

        })
    }

}

export default CarritosDaoFirebase;