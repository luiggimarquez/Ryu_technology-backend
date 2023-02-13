import {Router} from 'express'
import passport from 'passport'
import { loginValidator } from "../middleware/loginValidate.js";
import controllers from '../Controllers/productsController.js'


const router = Router()

class RouterProducts{

    constructor(){

        this.controllersMethod= controllers
    }

    init(){

        router.get('/products', loginValidator, this.controllersMethod.getProductsTest)
        router.get("/", this.controllersMethod.getRoot)
        router.post("/", this.controllersMethod.postRoot)

        return router
    }
}

let routerProducts = new RouterProducts 
export default routerProducts;