import {Router} from 'express'
import controllers from '../Controllers/controllerInfo.js'


const routerInfo = Router()

class InfoRouter{

    constructor(){

        this.controllersMethod = controllers
    }

    init(){

        routerInfo.get('/info', this.controllersMethod.getInfo )
        return routerInfo
    }
}


let infoRouter = new InfoRouter
export default infoRouter