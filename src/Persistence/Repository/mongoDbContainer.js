//import { isValidObjectId, mongoose } from "mongoose";
class MongoDbContainer{

    constructor(collection){
        this.collection =  collection
    }

    async getAll(){

        let itemsRead  = await (this.collection).find({})
        return itemsRead  
    }

    async getById(idItemSearch){

        let result = await (this.collection).find({ _id: idItemSearch }).exec().catch(error => { return error })
        if (result.length === 0) { (result = { Error: `Producto no encontrado` }) }
        return result
    }

    async deleteItem(idItemSearch){

        await (this.collection).deleteOne({_id:idItemSearch})
    }
}
export default MongoDbContainer;