import ContenedorMongoDb from "../../Contenedores/ContenedorMongoDb.js";
import { cartsModel } from '../../models/mongoDb/cartModel.js';

class CarritosDaoMongoDb extends ContenedorMongoDb{

    constructor(){

        super(cartsModel)
    }

    async createCart(cart, email){

        cart.id = cart.id.toString()
        cart.active = true;
        cart = {...cart, email}
        const cartsSaveModel = new cartsModel(cart)
        await cartsSaveModel.save()
    }

    async addItemCar(product,id){

        let result = await cartsModel.updateOne({id:id, "products.id":product.id},{$inc: {"products.$.quantity":1}})

        if(result.matchedCount === 0){ 
            await cartsModel.updateOne({id:id},{ $addToSet:{  products: {... product,quantity:1} } })
        }
    }

    async deleteItemCart(id,id_prod){
    
        await cartsModel.updateOne({id:id},{$pull:{ products:{id:id_prod} }})
    }

    async finishCart(id){
        
        await cartsModel.updateOne({id:id},{$set: {active:false}})
    }

}

export default CarritosDaoMongoDb;