
import passport from 'passport'
import services from '../Services/serviceLogin.js'

class LoginControllers{

    constructor(){

        this.servicesMethod = services
    }

    getLogin = (req,res)=>{

        this.servicesMethod.getLogin()
        req.isAuthenticated() ? res.redirect("/") : res.render('login')
    }
    
    getLogout = (req,res)=>{
    
        this.servicesMethod.getLogout()
        let name = req.user.userName
        res.render('logout',{name})
    }
    
    getRegister = (req,res)=>{
    
        this.servicesMethod.getRegister()
        res.render("register")
    }
    
    getErrorRegister = (req,res)=>{
    
        this.servicesMethod.getErrorRegister()
        res.render('errorRegister')
    }
    
    getErrorLogin = (req,res)=>{
    
        this.servicesMethod.getErrorLogin()
        res.render('errorLogin')
    }
    
    deleteLogout = async(req,res)=>{
    
        this.servicesMethod.deleteLogout(req.session)
        return res.json("done")
    
    }
    
    postRegister =  passport.authenticate('register',{
    
        failureRedirect:'/errorRegister',
        successRedirect: '/'
    })
    
    postLogin = passport.authenticate('login',{
    
        failureRedirect: '/errorLogin',
        successRedirect: '/' 
    })
    
}

let controllers = new LoginControllers
export default controllers