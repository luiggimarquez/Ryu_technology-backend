import { isValidObjectId, mongoose } from "mongoose";
class MongoDbContainer{

    constructor(collection){
        this.collection =  collection
    }

    async getAll(){

        let itemsRead  = await (this.collection).find({})
        return itemsRead  
    }

    async getById(idItemSearch){

        while(idItemSearch !== ""){
            
            if (idItemSearch.match(/^[0-9a-fA-F]{24}$/)) {

                let result = await (this.collection).find({ _id: idItemSearch }).exec().catch(error => { return error })
                if (result.length === 0) { (result = { Error: `Producto no encontrado` }) }
                return result

            } else {

                return { Error: `Producto no encontrado` }
            }
        }
    }

    async deleteItem(idItemSearch){

        await (this.collection).deleteOne({id:idItemSearch})
    }
}
export default MongoDbContainer;