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
    /* getLogout = (req,res)=>{
    
        this.servicesMethod.getLogout()
        let name = req.user.userName
        res.render('logout',{name})
    } */
    
    getRegister = (req,res)=>{
    
        this.servicesMethod.getRegister()
        //res.render("register")
        res.json("register ok")
    }
    
   /*  getErrorRegister = (req,res)=>{
    
        this.servicesMethod.getErrorRegister()
        res.render('errorRegister')
    }*/
    
    getErrorLogin = (req,res)=>{
    
        this.servicesMethod.getErrorLogin()
        res.render('errorLogin')
    }
    /* 
    deleteLogout = async(req,res)=>{
    
        this.servicesMethod.deleteLogout(req.session)
        return res.json("done")
    
    }  */
    
    postRegister =  passport.authenticate('register',{
    
        failureRedirect:'/Register',
        //successRedirect: '/'
    })
    
    postLoginMiddleware = passport.authenticate('login',{

        failureRedirect:'/Register'
    })

    postLoginCallBack = (req,res,next)=>{

        res.cookie('token', req.user.token, { httpOnly: true });
       // res.render("products") 
        //res.redirect("/")
        res.send(req.user)
    }
        
      
    
}

let controllers = new LoginControllers
export default controllers