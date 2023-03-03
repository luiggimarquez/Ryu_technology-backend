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
        routerCart.delete('/:id/productos/:id_prod', loginValidator, this.controllersMethod.deleteProductCart)
        routerCart.delete('/:id', loginValidator, this.controllersMethod.deleteCart)
        routerCart.put('/:id', loginValidator, this.controllersMethod.finishCart)
        return routerCart
    }
}

let cartRouter =  new CartRouter
export default cartRouter