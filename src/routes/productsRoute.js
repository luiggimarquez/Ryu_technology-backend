import {Router} from 'express'
import passport from 'passport'
import { loginValidator } from "../middleware/loginValidate.js";
import { uploadImgProducts } from '../../utils/uploadImg.js';
import controllers from '../Controllers/productsController.js'


const router = Router()

class RouterProducts{

    constructor(){

        this.controllersMethod= controllers
    }

    init(){

        router.get('/products', loginValidator, this.controllersMethod.getProducts)
        router.get("/", this.controllersMethod.getRoot)
        router.get("/products/:id", this.controllersMethod.getProductById)
        router.post("/", uploadImgProducts, this.controllersMethod.postRoot)

        return router
    }
}

let routerProducts = new RouterProducts 
export default routerProducts;