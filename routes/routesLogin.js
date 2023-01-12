import {Router} from 'express'
import { getLogin, getLogout, getRegister, getErrorRegister, getErrorLogin, deleteLogout, postRegister, postLogin } from '../Controllers/login.js'

const routerLogin = Router()

routerLogin.get("/login", getLogin)
routerLogin.get("/logout", getLogout)
routerLogin.get("/register", getRegister)
routerLogin.get('/errorRegister', getErrorRegister)
routerLogin.get('/errorLogin', getErrorLogin)
routerLogin.delete("/logout", deleteLogout)
routerLogin.post("/register", postRegister)
routerLogin.post("/login", postLogin)

export default routerLogin