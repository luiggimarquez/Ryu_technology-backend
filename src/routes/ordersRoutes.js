import { Router } from 'express'
import { loginValidator } from "../middleware/loginValidate.js";
import controllers from '../controllers/ordersController.js'

const routerOrders = Router()

class OrdersRouter{

    constructor(){

        this.controllersMethod = controllers
    }

    init(){

        routerOrders.get('/',loginValidator, this.controllersMethod.getOrders)
        routerOrders.get('/preOrden',loginValidator,this.controllersMethod.getPreOrder)
        routerOrders.post('/',loginValidator, this.controllersMethod.createOrderCart)
        routerOrders.post('/pre-orden',this.controllersMethod.saveAddressOrder)
       

        return routerOrders
    }
}

let ordersRouter =  new OrdersRouter
export default ordersRouter