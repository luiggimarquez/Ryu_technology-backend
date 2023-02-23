import { logger, loggerError } from '../../utils/log.js'
import cartsDaoMethods from '../Persistence/DAO/cart/cartsDaoMongoDb.js'

class CartServices {

     getActualCart = async(req, res) =>{
        
        return await cartsDaoMethods.getAll().then((products) =>{
            return products.filter(activeCart => (activeCart.active === true && req.user.email === activeCart.email))
        })
    } 
    
    saveCart = async(req, res) =>{
        
        let result = await cartsDaoMethods.createCart(req.body, req.user.email)
        return result
    } 

    getLengthCart = async() =>{
        return await cartsDaoMethods.getAll().then((products) => {
            return products.length
        })
    }

    addItemCart = async(products,id) =>{

        return await cartsDaoMethods.addItemCart(products,id)
    }

    getProductsAdded = async (id) => {

        return await cartsDaoMethods.getById(id).then( products =>{
            return products
        })
    }

    deleteItemCart = async(req,res)=>{

        const {id, id_prod} = req.params
        cartsDaoMethods.deleteItemCart(id,id_prod)
    }

    deleteCart = async(req,res) =>{

        const{ id } = req.params;
        cartsDaoMethods.deleteItem(id)
    }

    finishCart = async(req,res) =>{
        const {id} = req.params;
        return await cartsDaoMethods.finishCart(id)
    }
}

let services = new CartServices
export default services