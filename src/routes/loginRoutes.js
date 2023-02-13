import { Router } from "express";
import { loginValidator } from "../middleware/loginValidate.js";
import controllers from "../controllers/loginController.js";

const routerLogin = Router()


class LoginRouter{

    constructor(){

        this.controllersMethod = controllers
    }

    init(){

        routerLogin.get("/login", this.controllersMethod.getLogin)
        //routerLogin.get("/logout", this.controllersMethod.getLogout)
        routerLogin.get("/register", this.controllersMethod.getRegister)
        //routerLogin.get('/errorRegister', this.controllersMethod.getErrorRegister)
        //ksrouterLogin.get('/errorLogin', this.controllersMethod.getErrorLogin)
        //routerLogin.delete("/logout", this.controllersMethod.deleteLogout)
        routerLogin.post("/register", this.controllersMethod.postRegister)
        routerLogin.post("/login", this.controllersMethod.postLoginMiddleware, this.controllersMethod.postLoginCallBack)
        return routerLogin
    }
}


let loginRouter = new LoginRouter
export default loginRouter