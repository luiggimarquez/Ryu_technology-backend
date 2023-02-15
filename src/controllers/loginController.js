import services from "../services/loginServices.js"
import passport from 'passport'

class LoginControllers{

    constructor(){

        this.servicesMethod = services
    }

    getLogin = (req,res)=>{

        this.servicesMethod.getLogin()
        req.isAuthenticated() ? res.redirect("/products"): res.sendFile('./index.html',  {root:'./public/index'})
    }
    
    getLogout = (req,res)=>{
    
        this.servicesMethod.getLogout()
        let name = []
        req.isAuthenticated() ? (name = req.user.userName, res.render('logout',{name})) : res.redirect("/login")
    }
    
    getRegister = (req,res)=>{
    
        this.servicesMethod.getRegister()
        res.render("register")
    }
    
    getErrorRegister = (req,res)=>{
    
        this.servicesMethod.getErrorRegister()
        res.render("errorRegister")  
    }
    
    getErrorLogin = (req,res)=>{
    
        this.servicesMethod.getErrorLogin()
        res.render("errorLogin")
    }
    
    deleteLogout = async(req,res)=>{
    
        this.servicesMethod.deleteLogout(req.session)
        return res.json("done")
    }
    
    postLoginMiddleware = passport.authenticate('login',{

        failureRedirect:'/errorLogin',
    })

    postRegister =  passport.authenticate('register',{
    
        failureRedirect:'/errorRegister',
    })
    
    postLoginCallBack = (req,res,next)=>{

        res.cookie('token', req.user.token, { httpOnly: true });
        console.log("usuario: ", req.user)
        res.redirect("/products")
    }

    postRegisterCallBack = (req,res,next)=>{

        res.cookie('token', req.user.token, { httpOnly: true });
        res.redirect("/products")
    }
}

let controllers = new LoginControllers
export default controllers