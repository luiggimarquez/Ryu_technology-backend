import fileContainer from "../../Containers/fileDbContainer.js";
import { mocksProduct } from "../../../utils/mocks.js";
import daoMethod from "../messages/messagesDaoFile.js";

const randomProducts=[]

class ProductsDaoFile extends fileContainer{

    constructor(){
        super('persistencia/files/products.txt')
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

export default ProductsDaoFile