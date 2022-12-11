import {Router} from 'express'
import passport from 'passport'
import { logger } from '../utils/logger.js'

const routerLogin = Router()

routerLogin.get("/login", (req,res)=>{

    logger.info("Request Received: Route: /login Method: GET")
    req.isAuthenticated() ? res.redirect("/") : res.render('login')
})

routerLogin.get("/logout", (req,res)=>{

    logger.info("Request Received: Route: /logout Method: GET")
    let name = req.user.userName
    res.render('logout',{name})
})

routerLogin.get("/register",(req,res)=>{

    logger.info("Request Received: Route: /register Method: GET")
    res.render("register")

})

routerLogin.get('/errorRegister', (req,res)=>{

    logger.info("Request Received: Route: /errorRegister Method: GET")
    res.render('errorRegister')
})

routerLogin.get('/errorLogin', (req,res)=>{

    logger.info("Request Received: Route: /errorLogin Method: GET")
    res.render('errorLogin')
})


routerLogin.delete("/logout",(req,res)=>{

    logger.info("Request Received: Route: /logout Method: DELETE")
    req.session.destroy()
    res.json("done")
})


routerLogin.post("/register", passport.authenticate('register',{

    failureRedirect:'/errorRegister',
    successRedirect: '/'
}), ()=> logger.info("Request Received: Route: /register Method: POST"))
   

routerLogin.post("/login", passport.authenticate('login',{

    failureRedirect: '/errorLogin',
    successRedirect: '/' 
}),()=> {logger.info("Request Received: Route: /login Method: POST")})

export default routerLogin