import MongoDbContainer from "../../Repository/mongoDbContainer.js";
import { cartsModel } from "../../models/cartsMongoDbModels.js" 

class CartsDaoMongoDb extends MongoDbContainer{

    constructor(){

        super(cartsModel)
    }

    async createCart(cart, email){

        //cart.id = cart.id.toString()
        cart.active = true;
        cart.address = "";
        cart = {...cart, email}
        const cartsSaveModel = new cartsModel(cart)
        let result = await cartsSaveModel.save()
        return result
    }

    async addItemCart(product,id){

        let result = await cartsModel.updateOne({_id:id, "products._id":product._id},{$inc: {"products.$.quantity":1}})
        if(result.matchedCount === 0){ 
            await cartsModel.updateOne({_id:id},{ $addToSet:{  products: {... product,quantity:1} } })
        }
    }

    async deleteItemCart(id, id_prod){

        await cartsModel.updateOne({_id:id},{$pull:{ products:{_id:id_prod} }})
    }

    async finishCart(id){
        
        return await cartsModel.updateOne({_id:id},{$set: {active:false}})
    }
}

let cartsDaoMethods = new CartsDaoMongoDb;
export default cartsDaoMethods;