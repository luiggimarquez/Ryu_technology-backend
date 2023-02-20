import { logger, loggerError } from '../../utils/log.js'
import cartsDaoMethods from '../Persistence/DAO/cart/cartsDaoMongoDb.js'


class CartServices {

    
     getActualCart = async(req, res) =>{
        
        return await cartsDaoMethods.getAll().then((products) =>{
            return products.filter(activeCart => (activeCart.active === true && req.user.email === activeCart.email))
        })
    } 
    
    saveCart = async(req, res) =>{
        
        cartsDaoMethods.createCart(req.body, req.user.email)
    } 

    getLengthCart = async() =>{
        return await cartsDaoMethods.getAll().then((products) => {
            return products.length
        })
    }

    addItemCart = (products,id) =>{

        cartsDaoMethods.addItemCart(products,id)
    }

    getProductsAdded = async (id) => {

        return await cartsDaoMethods.getById(id).then( products =>{
            return products
        })
    }

}

let services = new CartServices
export default services