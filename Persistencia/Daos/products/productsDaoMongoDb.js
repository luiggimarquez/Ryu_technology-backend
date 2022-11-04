import mongoDbContainer from "../../Containers/mongoDbContainer.js";
import { productsModel } from "../../Models/MongoDbModel/productsMongoDbModel.js";
import { mocksProduct } from "../../../utils/mocks.js"
const randomProducts=[]

class ProductsDaoMongoDb extends mongoDbContainer{

    constructor(){
        super(productsModel)
    }

    async getProducts(){
        return randomProducts
    } 

    async getFaker(){
        for(let i=0;i<=4;i++){
            let result = mocksProduct()
            randomProducts.push(result) 
        }
        return randomProducts 
    }
}

export default ProductsDaoMongoDb