//import { isValidObjectId, mongoose } from "mongoose";
class MongoDbContainer{

    constructor(collection){
        this.collection =  collection
    }

    async getAll(){

        let itemsRead = []
        try{
            itemsRead  = await (this.collection).find({})
        }catch(error){
            logger.error(error)
            loggerError.error(error) 
        }
        return itemsRead  
    }

    async getById(idItemSearch){

        let result = []
        try{
            result = await (this.collection).find({ _id: idItemSearch }).exec().catch(error => { return error })
        }catch(error){
            logger.error(error)
            loggerError.error(error)  
        }
        if (result.length === 0) { (result = { Error: `Producto no encontrado` }) }
        return result
    }

    async deleteItem(idItemSearch){

        try{
            await (this.collection).deleteOne({_id:idItemSearch})
        }catch(error){
            logger.error(error)
            loggerError.error(error)
        }
    }
}
export default MongoDbContainer;