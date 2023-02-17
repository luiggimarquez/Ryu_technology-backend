import { Router } from "express";
import { uploadImgUsers } from "../../utils/uploadImg.js"
import controllers from "../controllers/loginController.js";

const routerLogin = Router()

class LoginRouter{

    constructor(){

        this.controllersMethod = controllers
    }

    init(){

        routerLogin.get("/login", this.controllersMethod.getLogin)
        routerLogin.get("/logout", this.controllersMethod.getLogout)
        routerLogin.get("/register", this.controllersMethod.getRegister)
        routerLogin.get('/errorLogin', this.controllersMethod.getErrorLogin)
        routerLogin.get('/errorRegister', this.controllersMethod.getErrorRegister)
        routerLogin.delete("/logout", this.controllersMethod.deleteLogout)
        routerLogin.post("/login", this.controllersMethod.postLoginMiddleware, this.controllersMethod.postLoginCallBack)
        routerLogin.post("/register",uploadImgUsers, this.controllersMethod.postRegister, this.controllersMethod.postRegisterCallBack)
        return routerLogin
    }
}

let loginRouter = new LoginRouter
export default loginRouter