import MongoDbContainer from "../../Repository/mongoDbContainer.js";
import { cartsModel } from "../../models/cartsMongoDbModels.js" 

class CartsDaoMongoDb extends MongoDbContainer{

    constructor(){

        super(cartsModel)
    }

    async createCart(cart, email){

        cart.id = cart.id.toString()
        cart.active = true;
        cart.address = "";
        cart = {...cart, email}
        const cartsSaveModel = new cartsModel(cart)
        await cartsSaveModel.save()
    }

    async addItemCart(product,id){
        console.log("mongo", product)

        let result = await cartsModel.updateOne({id:id, "products._id":product._id},{$inc: {"products.$.quantity":1}})
        if(result.matchedCount === 0){ 
            await cartsModel.updateOne({id:id},{ $addToSet:{  products: {... product,quantity:1} } })
        }
    }
}

let cartsDaoMethods = new CartsDaoMongoDb;
export default cartsDaoMethods;