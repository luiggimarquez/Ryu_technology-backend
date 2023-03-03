import MongoDbContainer from "../../Repository/mongoDbContainer.js";
import { ordersModel } from "../../models/ordersMongoDbModel.js" 

class OrdersDaoMongoDb extends MongoDbContainer{

    constructor(){

        super(ordersModel)
    }

    async createOrder(order){
        let result = []
        const ordersSaveModel = new ordersModel(order)
        try {
            result = await ordersSaveModel.save()
        } catch (error) {
            logger.error(error)
            loggerError.error(error)
        }
        return result
    }

    async updateOrder(id, address){
        
        let result = []
        try {
            result= await ordersModel.findByIdAndUpdate({_id:id},{address: address}, {new: true})
        } catch (error) {
            logger.error(error)
            loggerError.error(error)
            next(error)
        }
        return result
    }
}

let ordersDaoMethods = new OrdersDaoMongoDb;
export default ordersDaoMethods;