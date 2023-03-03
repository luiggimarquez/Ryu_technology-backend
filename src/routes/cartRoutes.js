import { Router } from 'express'
import { loginValidator } from "../middleware/loginValidate.js";
import controllers from '../controllers/cartController.js'

const routerCart = Router()

class CartRouter{

    constructor(){

        this.controllersMethod = controllers
    }

    init(){

        routerCart.get('/', this.controllersMethod.getCarts)
        routerCart.get('/cartPreview', this.controllersMethod.getCartPreview)
        routerCart.get('/:id/productos', this.controllersMethod.getProductsCart)
        routerCart.post('/', this.controllersMethod.createCart)
        routerCart.post('/:id/productos', this.controllersMethod.AddProductToCart)
        routerCart.delete('/:id/productos/:id_prod', this.controllersMethod.deleteProductCart)
        routerCart.delete('/:id',this.controllersMethod.deleteCart)
        routerCart.put('/:id', this.controllersMethod.finishCart)
        return routerCart
    }
}

let cartRouter =  new CartRouter
export default cartRouter