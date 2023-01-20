import firebaseContainer from "../../Repository/firebaseDbContainer.js";
import { mocksProduct } from "../../../utils/mocks.js";
const randomProducts=[]

class ProductsDaoFirebase extends firebaseContainer{

    constructor(){
        super("products")
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
            this.instance = new ProductsDaoFirebase()
        } 
        
        return this.instance
    }
}

export default ProductsDaoFirebase