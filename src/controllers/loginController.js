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
        let name = req.user.userName
        res.render('logout',{name})
    }
    
    getRegister = (req,res)=>{
    
        this.servicesMethod.getRegister()
        res.render("register") //res.redirect("/products")
    }
    
    getErrorRegister = (req,res)=>{
    
        this.servicesMethod.getErrorRegister()
        console.log("Error registro")
        res.render("errorRegister")
        //res.render('products')
  
    }
    
    getErrorLogin = (req,res)=>{
    
        this.servicesMethod.getErrorLogin()
        console.log("se produjo error en el login")
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
        //successRedirect: '/'
    })
    

    postLoginCallBack = (req,res,next)=>{

        res.cookie('token', req.user.token, { httpOnly: true });
        console.log("entre al postlogin")
        //res.json(req.user)
        res.redirect("/products")
    }

    postRegisterCallBack = (req,res,next)=>{
        console.log("entro registro")

        res.cookie('token', req.user.token, { httpOnly: true });
        res.redirect("/products")
    }
         
    
}

let controllers = new LoginControllers
export default controllers