import firebaseContainer from "../../Containers/firebaseDbContainer.js";
import { mocksProduct } from "../../../utils/mocks.js";
const randomProducts=[]

class ProductsDaoFirebase extends firebaseContainer{

    constructor(){
        super("products")
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

export default ProductsDaoFirebase