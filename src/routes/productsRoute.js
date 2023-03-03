import {Router} from 'express'
import passport from 'passport'
import { loginValidator } from "../middleware/loginValidate.js";
import { uploadImgProducts, uploadImgProductUpdate } from '../../utils/uploadImg.js';
import controllers from '../controllers/productsController.js'


const router = Router()

class RouterProducts{

    constructor(){

        this.controllersMethod= controllers
    }

    init(){

        router.get('/',loginValidator, this.controllersMethod.getRoot)
        router.get('/products', loginValidator, this.controllersMethod.getProducts)
        router.get('/productos',loginValidator, this.controllersMethod.getPageProducts)
        router.get('/products/:id', loginValidator, this.controllersMethod.getProductById)
        router.get('/productos/category/:category', loginValidator, this.controllersMethod.getProductsbyCategory)
        router.post('/', uploadImgProducts, this.controllersMethod.postRoot)
        router.post('/products/imageUpdate', uploadImgProductUpdate, this.controllersMethod.updateImage)
        router.put('/products/:id', loginValidator, this.controllersMethod.modifyProduct)
        router.delete('/products/:id',loginValidator, this.controllersMethod.deleteProduct)
        return router
    }
}

let routerProducts = new RouterProducts 
export default routerProducts;