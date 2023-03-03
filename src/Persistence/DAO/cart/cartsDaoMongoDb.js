import MongoDbContainer from "../../Repository/mongoDbContainer.js";
import { cartsModel } from "../../models/cartsMongoDbModels.js"
import { logger, loggerError } from '../../../../utils/log.js'

class CartsDaoMongoDb extends MongoDbContainer{

    constructor(){
        
        super(cartsModel)
    }

    async createCart(cart, email){
        let result = []
        cart.active = true;
        cart.address = "";
        cart = {...cart, email}
        const cartsSaveModel = new cartsModel(cart)
        try {
            result = await cartsSaveModel.save()
        } catch (error) {
            logger.error(error)
            loggerError.error(error)
        }
        return result
    }

    async addItemCart(product,id){
        let result = []
        try {
            result = await cartsModel.updateOne({_id:id, "products._id":product._id},{$inc: {"products.$.quantity":1}})
            if(result.matchedCount === 0){ 
                await cartsModel.updateOne({_id:id},{ $addToSet:{  products: {... product,quantity:1} } })
            }
        } catch (error) {
            logger.error(error)
            loggerError.error(error)
        }
    }

    async deleteItemCart(id, id_prod){
        try {
            await cartsModel.updateOne({_id:id},{$pull:{ products:{_id:id_prod} }})
        } catch (error) {
            logger.error(error)
            loggerError.error(error)
        }
    }

    async finishCart(id){
        try {
            return await cartsModel.updateOne({_id:id},{$set: {active:false}})
        } catch (error) {
            logger.error(error)
            loggerError.error(error)
        }
    }
}

let cartsDaoMethods = new CartsDaoMongoDb;
export default cartsDaoMethods;