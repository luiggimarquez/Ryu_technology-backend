import {Router} from 'express'
import passport from 'passport'

const routerLogin = Router()

routerLogin.get("/login", (req,res)=>{

    req.isAuthenticated() ? res.redirect("/") : res.render('login')
})

routerLogin.get("/logout", (req,res)=>{
    let name = req.user.userName
    res.render('logout',{name})
})

routerLogin.get("/register",(req,res)=>{
    res.render("register")

})

routerLogin.get('/errorRegister', (req,res)=>{
    res.render('errorRegister')
})

routerLogin.get('/errorLogin', (req,res)=>{
    res.render('errorLogin')
})


routerLogin.delete("/logout",(req,res)=>{
    req.session.destroy()
    res.json("done")
})


routerLogin.post("/register", passport.authenticate('register',{

    failureRedirect:'/errorRegister',
    successRedirect: '/'
}))

routerLogin.post("/login", passport.authenticate('login',{

    failureRedirect: '/errorLogin',
    successRedirect: '/' 
}))




export default routerLogin