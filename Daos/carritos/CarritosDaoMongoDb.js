import ContenedorMongoDb from "../../Contenedores/ContenedorMongoDb.js"
import { cartsModel } from '../../db/models/mongo/cartModel.js';

class CarritosDaoMongoDb extends ContenedorMongoDb{

    constructor(){

        super(cartsModel)
    }

    async createCart(cart){

        cart.id = cart.id.toString()
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
}

export default CarritosDaoMongoDb;