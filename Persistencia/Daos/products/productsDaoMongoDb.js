import mongoDbContainer from "../../Repository/mongoDbContainer.js";
import { productsModel } from "../../Models/MongoDbModel/productsMongoDbModel.js";
import { mocksProduct } from "../../../utils/mocks.js"
const randomProducts=[]
 

class ProductsDaoMongoDb extends mongoDbContainer{

    static instance;

    constructor(){
        super(productsModel)
    }

    async getProducts(){
        for(let i=0;i<=4;i++){
            let result = mocksProduct()
            randomProducts.push(result) 
        }
        return randomProducts 
    } 

    async getFaker(){
        for(let i=0;i<=4;i++){
            let result = mocksProduct()
            randomProducts.push(result) 
        }
        return randomProducts 
    }

    static getInstance(){

        if(!this.instance){
            this.instance = new ProductsDaoMongoDb()
        } 
        
        return this.instance
    }
}

export default ProductsDaoMongoDb