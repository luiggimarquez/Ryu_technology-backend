import MongoDbContainer from "../../Repository/mongoDbContainer.js";
import { ordersModel } from "../../models/ordersMongoDbModel.js" 

class OrdersDaoMongoDb extends MongoDbContainer{

    constructor(){

        super(ordersModel)
    }

    async createOrder(order){

        const ordersSaveModel = new ordersModel(order)
        let result = await ordersSaveModel.save()
        return result
    }

    async updateOrder(id, address){

        let modify = await ordersModel.findByIdAndUpdate({_id:id},{address: address})
    }

   
}

let ordersDaoMethods = new OrdersDaoMongoDb;
export default ordersDaoMethods;