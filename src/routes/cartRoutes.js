import { Router } from 'express'
import { loginValidator } from "../middleware/loginValidate.js";
import controllers from '../controllers/cartController.js'

const routerCart = Router()

class CartRouter{

    constructor(){

        this.controllersMethod = controllers
    }

    init(){

        routerCart.get('/',loginValidator, this.controllersMethod.getCarts)
        routerCart.get('/cartPreview',loginValidator, this.controllersMethod.getCartPreview)
        routerCart.get('/:id/productos', loginValidator, this.controllersMethod.getProductsCart)
        routerCart.post('/', loginValidator, this.controllersMethod.createCart)
        routerCart.post('/:id/productos', loginValidator, this.controllersMethod.AddProductToCart)

        return routerCart
    }
}

let cartRouter =  new CartRouter
export default cartRouter