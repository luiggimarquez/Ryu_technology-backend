import {Router} from 'express'
import controllers from '../Controllers/controllerProducts.js'
import {loginUser} from '../middleware/loginUser.js'

const router = Router()

class RouterProducts{

    constructor(){

        this.controllersMethod= controllers
    }

    init(){

        router.get("/api/productos-test", this.controllersMethod.getProductsTest)
        router.get("/", loginUser, this.controllersMethod.getRoot)
        router.post("/", this.controllersMethod.postRoot)

        return router
    }
}

let routerProducts = new RouterProducts 
export default routerProducts;