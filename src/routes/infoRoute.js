import { Router } from "express";
import controllers from "../controllers/infoController.js";
import { loginValidator } from "../middleware/loginValidate.js";

const routerInfo = Router()


class InfoRouter{

    constructor(){

        this.controllersMethod = controllers
    }

    init(){

        routerInfo.get("/info", loginValidator, this.controllersMethod.getInfo)
        return routerInfo
    }
}


let infoRouter = new InfoRouter
export default infoRouter